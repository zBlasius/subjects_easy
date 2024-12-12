
import { courseModule } from "../../..";

export interface IMediatorService {
  listActiveCourses(userId: string): Promise<courseModule.models.CourseModel[] | null>;
}
