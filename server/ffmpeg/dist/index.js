"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const uniqueId = process.env.UNIQUE_ID || "";
const ERROR_LOGGING_LAMBDA_URL = process.env.ERROR_LOGGING_LAMBDA_URL || "";
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
function reportError(context, error, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error(context, error);
        if (!ERROR_LOGGING_LAMBDA_URL)
            return;
        try {
            yield fetch(ERROR_LOGGING_LAMBDA_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.assign({ context, message: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined, uniqueId, timestamp: new Date().toISOString() }, metadata)),
            });
        }
        catch (dispatchError) {
            console.error("reportError: failed to dispatch error to lambda", dispatchError);
        }
    });
}
//! Fazer lógica para tratamento de erros e registro de logs
class S3Service {
    constructor() {
        this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
    }
    // TODO - Write tests here
    getS3FileUrl(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: this.bucketName,
                Key: fileName,
            };
            try {
                const result = yield s3.getSignedUrlPromise("getObject", params);
                return result;
            }
            catch (error) {
                yield reportError("getS3FileUrl", error, { fileName });
                throw new Error("Erro ao obter URL do arquivo");
            }
        });
    }
    downloadFile(fileName, destinationPath) {
        const params = {
            Bucket: this.bucketName,
            Key: fileName,
        };
        return new Promise((resolve, reject) => {
            fs_1.default.mkdirSync(path_1.default.dirname(destinationPath), { recursive: true });
            const fileStream = fs_1.default.createWriteStream(destinationPath);
            const s3Stream = s3.getObject(params).createReadStream();
            s3Stream.on("error", (error) => {
                reportError("downloadFile:s3Stream", error, {
                    fileName,
                    destinationPath,
                });
                reject(new Error("Erro ao baixar o arquivo"));
            });
            fileStream.on("error", (error) => {
                reportError("downloadFile:fileStream", error, {
                    fileName,
                    destinationPath,
                });
                reject(new Error("Erro ao salvar o arquivo"));
            });
            fileStream.on("close", () => {
                return resolve(destinationPath);
            });
            s3Stream.pipe(fileStream);
        });
    }
    ffmpegProcessing(filePath, outputFilePath, outputDir) {
        const segmentFilename = path_1.default.join(outputDir, "segment%03d.ts");
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(filePath)
                .outputOptions([
                "-codec:v libx264", // encodes the video strem to h264 (hls)
                "-codec:a aac", // encodes the audio stream to aac (hls)
                "-start_number 0", // tells ffmpeg to start the segment numbering from 0
                "-hls_time 10", // time of each chunk
                "-hls_list_size 0", // ?
                "-f hls", //Forces ffmpeg to produce HLS output
            ])
                .outputOption("-hls_segment_filename", segmentFilename)
                .output(outputFilePath)
                .on("error", (error) => {
                reportError("ffmpegProcessing", error, { filePath, outputFilePath });
                reject(new Error("Erro ao converter arquivo para HLS"));
            })
                .on("end", () => resolve())
                .run();
        });
    }
    transformFileInHls(filePath, outputFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputDir = path_1.default.dirname(outputFilePath);
            fs_1.default.mkdirSync(outputDir, { recursive: true });
            yield this.ffmpegProcessing(filePath, outputFilePath, outputDir);
            const s3Prefix = outputDir
                .replace(/^\.[\\/]/, "")
                .replace(/\\/g, "/")
                .replace(/\.[^/]*(?=\/)/, "");
            const files = fs_1.default.readdirSync(outputDir);
            for (const file of files) {
                const fileContent = fs_1.default.readFileSync(path_1.default.join(outputDir, file));
                const mimeType = file.endsWith(".m3u8")
                    ? "application/vnd.apple.mpegurl"
                    : "video/mp2t";
                yield this.uploadFile({
                    fileName: `${s3Prefix}/${file}`,
                    fileContent,
                    mimeType,
                });
            }
        });
    }
    uploadFile(_a) {
        return __awaiter(this, arguments, void 0, function* ({ fileName, fileContent, mimeType, }) {
            const params = {
                Bucket: this.bucketName,
                Key: fileName,
                Body: fileContent,
                ContentType: mimeType,
                ACL: "public-read",
            };
            try {
                const result = yield s3.upload(params).promise();
                return result.Location;
            }
            catch (error) {
                yield reportError("uploadFile", error, { fileName, mimeType });
                throw new Error("Erro ao fazer upload do arquivo");
            }
        });
    }
}
exports.S3Service = S3Service;
const s3Service = new S3Service();
function processVideo(uniqueId) {
    return __awaiter(this, void 0, void 0, function* () {
        //** uniqueId - Must to be a Uuid inserted in File table, I'll use it to identify the processed video */
        const tempDir = "./temp";
        const inputPath = path_1.default.join(tempDir, "video.mp4");
        const outputPath = path_1.default.join(uniqueId, "hls", "output.m3u8");
        try {
            // ** Disparar lamda/sqs para registrar job como processing
            yield s3Service.downloadFile(uniqueId, inputPath);
            yield s3Service.transformFileInHls(inputPath, outputPath);
            // ** Disparar lamda/sqs para registrar job como done
        }
        catch (error) {
            yield reportError("processVideo", error, { uniqueId });
        }
        finally {
            fs_1.default.rmSync(tempDir, { recursive: true, force: true });
            fs_1.default.rmSync(uniqueId, { recursive: true, force: true });
        }
    });
}
processVideo(uniqueId).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
    yield reportError("processVideo:unhandled", error, { uniqueId });
}));
// After is done, you should deploy it to ECR in order to be able to run it in ECS.
