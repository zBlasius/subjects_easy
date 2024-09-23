import { inject, injectable } from "inversify";
import { IFileService, IS3Service } from "./contracts";
import { TYPES } from "../../utils";
import { IFileRepository } from "../repository";

@injectable()
export class FileService implements IFileService {
  constructor(
    @inject(TYPES.FileRepository)
    private fileRepository: IFileRepository,
    @inject(TYPES.S3Service)
    private s3Service: IS3Service
  ) {}

  async listByCourseId(courseId: string) {
    return this.fileRepository.listByCourseId(courseId);
  }

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

    return this.fileRepository.create({
      courseId: param.courseId,
      title: param.title,
      description: param.description,
      bucketUrl,
    });
  }

  async saveFile(params: {
    fileContent: Buffer;
    fileName: string;
    mimeType: string;
  }) {
    const _buffer = params.fileContent;
    const url = await this.s3Service.uploadFile({
      fileName: params.fileName,
      fileContent: _buffer,
      mimeType: params.mimeType,
    });
    return url;
  }
}
