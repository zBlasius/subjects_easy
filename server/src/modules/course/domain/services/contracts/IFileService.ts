import FileModel from "../../model/FileModel";

export interface IFileService {
  /**
   *
   * Should list
   *
   */
  listByCourseId(courseId: string): Promise<FileModel[] | undefined>;

  create(param: {
    courseId:string,
    file: Buffer
  }): Promise<void>
}
