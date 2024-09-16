import { injectable } from "inversify";
import File from "../../../../database/mongodb/File";
import FileModel from "../model/FileModel";
import { IFileRepository } from "./contracts";

@injectable()
export class FileRepository implements IFileRepository {
  constructor() {}

  async create(data: {
    courseId: string;
    title: string;
    description: string;
    bucketUrl: string;
  }) {
    await File.create(data);
  }

  async listByCourseId(courseId: string) {
    const result = await File.find({courseId}).exec();
    if (!result) return;
    return result.map((item) => new FileModel(item));
  }
}
