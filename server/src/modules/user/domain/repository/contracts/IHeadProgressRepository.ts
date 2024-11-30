import { HeadProgressModel } from "../../model";

export interface IHeadProgressRepository {
  findByCourseId(courseId: string): Promise<HeadProgressModel | null>;
  createHeadProgress(courseId: string, userId: string): Promise<HeadProgressModel | null>;
}
