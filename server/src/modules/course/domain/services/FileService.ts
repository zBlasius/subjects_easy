import { inject, injectable } from "inversify";
import { IFileService, IS3Service } from "./contracts";
import { TYPES } from "../../utils";
import { IFileRepository } from "../../architeture";
import { ISQSService } from "../../../utils/sqs/ISQSService";
import { IJobService, JOB_TYPES } from "../../../utils/job";

@injectable()
export class FileService implements IFileService {
  constructor(
    @inject(TYPES.FileRepository)
    private fileRepository: IFileRepository,
    @inject(TYPES.S3Service)
    private s3Service: IS3Service,
    @inject(TYPES.SQSService)
    private sqsService: ISQSService,
    @inject(JOB_TYPES.JobService)
    private jobService: IJobService
  ) {}

  // TODO - Write tests here
  async listByCourseId(courseId: string) {
    return this.fileRepository.listByCourseId(courseId);
  }

  // TODO - Write tests here
  // TODO 14/07/26 - Test if jobs table is being created and updated correctly when a file is uploaded
  async create(param: {
    courseId: string;
    file: Buffer;
    fileName: string;
    title: string;
    description: string;
    mimeType: string;
  }) {
    const bucketUrl = await this.saveFile({
      fileContent: param.file,
      fileName: param.fileName,
      mimeType: param.mimeType,
    });

    const fileRecord = await this.fileRepository.create({
      courseId: param.courseId,
      title: param.title,
      description: param.description,
      bucketUrl,
    });

    const job = await this.jobService.create({
      referenceId: fileRecord.id,
      content: { fileName: param.fileName, mimeType: param.mimeType, bucketUrl },
      name: "video_processing",
    });

    await this.sqsService.sendMessage({
      s3Key: param.fileName,
      bucketName: process.env.AWS_S3_BUCKET_NAME || "",
      mimeType: param.mimeType,
      fileUrl: bucketUrl,
    });

    await this.jobService.updateStatus(job.id, "QUEUED");

    return fileRecord;
  }

  // TODO - Write tests here
  async saveFile(params: {
    fileContent: Buffer;
    fileName: string;
    mimeType: string;
  }) {
    // !URGENT TODO - Implement VideoId in filename to avoid overwriting files with the same name
    return this.s3Service.uploadFile({
      fileName: params.fileName,
      fileContent: params.fileContent,
      mimeType: params.mimeType,
    });
  }
}
