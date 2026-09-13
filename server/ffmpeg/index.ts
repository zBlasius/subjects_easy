const UNIQUE_ID = process.env.UNIQUE_ID || "";
const ERROR_LOGGING_LAMBDA_URL = process.env.ERROR_LOGGING_LAMBDA_URL || "";
const MIME_TYPE = process.env.MIME_TYPE || "";

import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { IS3Service } from "./IS3Service";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

//TODO - Identify problem at downloading video in ECS task
async function reportError(
  context: string,
  error: unknown,
  metadata?: Record<string, unknown>,
): Promise<void> {
  console.error(context, error);

  if (!ERROR_LOGGING_LAMBDA_URL) return;

  try {
    await fetch(ERROR_LOGGING_LAMBDA_URL, {
      // TODO - Write lambda function
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        uniqueId: UNIQUE_ID,
        timestamp: new Date().toISOString(),
        ...metadata,
      }),
    });
  } catch (dispatchError) {
    console.error(
      "reportError: failed to dispatch error to lambda",
      dispatchError,
    );
  }
}

interface UploadFileParams {
  fileName: string;
  fileContent: Buffer;
  mimeType: string;
}
//! Fazer lógica para tratamento de erros e registro de logs
export class S3Service implements IS3Service {
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || "";
  }

  // TODO - Write tests here
  async getS3FileUrl(fileName: string): Promise<string> {
    const params: PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    try {
      const result = await s3.getSignedUrlPromise("getObject", params);
      return result;
    } catch (error) {
      await reportError("getS3FileUrl", error, { fileName });
      throw new Error("Erro ao obter URL do arquivo");
    }
  }

  downloadFile(fileName: string, destinationPath: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `${fileName}.${MIME_TYPE?.replace(/^.*\//, "") || "unknown"}`,
    };
    return new Promise((resolve, reject) => {
      fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
      const fileStream = fs.createWriteStream(destinationPath);
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

  ffmpegProcessing(
    filePath: string,
    outputFilePath: string,
    outputDir: string,
  ) {
    const segmentFilename = path.join(outputDir, "segment%03d.ts");
    return new Promise<void>((resolve, reject) => {
      ffmpeg(filePath)
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

  async transformFileInHls(
    filePath: string,
    outputFilePath: string,
  ): Promise<void> {
    const outputDir = path.dirname(outputFilePath);
    fs.mkdirSync(outputDir, { recursive: true });

    await this.ffmpegProcessing(filePath, outputFilePath, outputDir);

    const s3Prefix = outputDir
      .replace(/^\.[\\/]/, "")
      .replace(/\\/g, "/")
      .replace(/\.[^/]*(?=\/)/, "");
    const files = fs.readdirSync(outputDir);

    for (const file of files) {
      const fileContent = fs.readFileSync(path.join(outputDir, file));
      const mimeType = file.endsWith(".m3u8")
        ? "application/vnd.apple.mpegurl"
        : "video/mp2t";

      await this.uploadFile({
        fileName: `${s3Prefix}/${file}`,
        fileContent,
        mimeType,
      });
    }
  }

  async uploadFile({
    fileName,
    fileContent,
    mimeType,
  }: UploadFileParams): Promise<string> {
    const params: PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: mimeType,
      ACL: "public-read",
    };

    try {
      const result = await s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      await reportError("uploadFile", error, { fileName, mimeType });
      throw new Error("Erro ao fazer upload do arquivo");
    }
  }
}

const s3Service = new S3Service();

async function processVideo(uniqueId: string): Promise<void> {
  //** uniqueId - Must to be a Uuid inserted in File table, I'll use it to identify the processed video */
  const tempDir = "./temp";
  const inputPath = path.join(tempDir, "video.mp4");
  const outputPath = path.join(uniqueId, "hls", "output.m3u8");

  try {
    // ** Disparar lamda/sqs para registrar job como processing
    await s3Service.downloadFile(uniqueId, inputPath);
    await s3Service.transformFileInHls(inputPath, outputPath);
    // ** Disparar lamda/sqs para registrar job como done
  } catch (error) {
    await reportError("processVideo", error, { uniqueId });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(uniqueId, { recursive: true, force: true });
  }
}

console.log("Starting video processing for uniqueId:", UNIQUE_ID);
console.log("MIME Type:", MIME_TYPE);

processVideo(UNIQUE_ID).catch(async (error: unknown) => {
  await reportError("processVideo:unhandled", error, { uniqueId: UNIQUE_ID });
});

// After is done, you should deploy it to ECR in order to be able to run it in ECS.
