import FileModel from "../../model/FileModel";

export interface IFileRepository {
  
    create(params: {
    courseId: string;
    title: string;
    description: string;
    bucketUrl: string;
  }): Promise<void>;

  listByCourseId(courseId: string): Promise<FileModel[] | undefined>;
}
