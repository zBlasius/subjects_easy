import { HeadProgressModel } from "../../model/HeadProgressModel";

/**
 * Interface for user services.
 */
export interface IProgressService {

  getHeadProgressByCourseId(courseId: string): Promise<HeadProgressModel | null>;
  createHeadProgress(courseId: string, userId: string): Promise<HeadProgressModel | null>;
}
