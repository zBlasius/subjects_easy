import { inject, injectable } from "inversify";
import { IFileService } from "./contracts";
import { TYPES } from "../../utils";
import { IFileRepository } from "../repository";


@injectable()
export class FileService implements IFileService {
  constructor(
    @inject(TYPES.FileRepository)
    private fileRepository: IFileRepository
  ) {}

  async listByCourseId(courseId: string){
    return this.fileRepository.listByCourseId(courseId);
  }

  async create(param: { courseId: string; file: Buffer; }): Promise<void> {
    return;
  }

  private async saveFile(buffer: Buffer){
    
    return "https://www.bucketaqui.com"
  }
}
