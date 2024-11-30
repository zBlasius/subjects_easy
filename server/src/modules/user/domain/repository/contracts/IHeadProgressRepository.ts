import { HeadProgressModel } from "../../model";

export interface IHeadProgressRepository {
  findByCourseId(courseId: string): Promise<HeadProgressModel | null>;
}
