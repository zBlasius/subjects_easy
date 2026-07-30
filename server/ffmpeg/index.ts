import { Router } from "express";
const videoKey = ""; //process.env.VIDEO_KEY;
const userId = ""; //process.env.USER_ID;
const outputBucket = ""; //process.env.OUTPUT_BUCKET;
const uniqueId = "unique-id"; //process.env.UNIQUE_ID;

import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { IS3Service } from "./IS3Service";
import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

const s3 = new AWS.S3({
  accessKeyId: "", //process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: "", //process.env.AWS_SECRET_ACCESS_KEY,
  region: "", //process.env.AWS_REGION,
});

interface UploadFileParams {
  fileName: string;
  fileContent: Buffer;
  mimeType: string;
}

export class S3Service implements IS3Service {
  private bucketName: string;

  constructor() {
    this.bucketName = ""; //process.env.AWS_S3_BUCKET_NAME || "";
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
      console.log("error", error);
      throw new Error("Erro ao obter URL do arquivo");
    }
  }

  async downloadFile(
    fileName: string,
    destinationPath: string,
  ): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    return new Promise((resolve, reject) => {
      fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
      const fileStream = fs.createWriteStream(destinationPath);
      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream.on("error", (error) => {
        console.log("error", error);
        reject(new Error("Erro ao baixar o arquivo"));
      });
      fileStream.on("error", (error) => {
        console.log("error", error);
        reject(new Error("Erro ao salvar o arquivo"));
      });
      fileStream.on("close", (info: any) => {
        console.log("info", info);
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
          console.log("error", error);
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

    const s3Prefix = outputDir.replace(/^\.[\\/]/, "").replace(/\\/g, "/");
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
      console.log("error", error);
      throw new Error("Erro ao fazer upload do arquivo");
    }
  }
}

const s3Service = new S3Service();

async function processVideo(fileName: string, uniqueId: string): Promise<void> {
  //** uniqueId - Must to be a Uuid inserted in File table, I'll use it to identify the processed video */
  const tempDir = "./temp";
  const inputPath = path.join(tempDir, "video.mp4");
  const outputPath = path.join(uniqueId, "hls", "output.m3u8");

  try {
    await s3Service.downloadFile(fileName, inputPath);
    await s3Service.transformFileInHls(inputPath, outputPath);
  }catch (error) {
    // ! Escrever lógica para o que fazer em caso de erro de processamento
    // ? Disparar fila SQS? Registrar direto no mongoBD? Disparar lambda para registrar no mongoDB?
    console.error("Erro ao processar vídeo:", error);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(uniqueId, { recursive: true, force: true });
  }
}

processVideo("Gravação de Tela 2024-12-30 113339.mp4", uniqueId).catch((error) => {
  console.error("Erro ao processar vídeo:", error);
});

// - Lambda triggering to ECS Task is working, the code present in ECS tasks is this one here.
// After is done, you should deploy it to ECR in order to be able to run it in ECS.
