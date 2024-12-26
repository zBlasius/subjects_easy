
import { courseModule } from "../../..";

export interface IMediatorService {
  listActiveCourses(userId: string): Promise<courseModule.models.CourseModel[] | null>;
  listTeacherCourses(userId: string): Promise<courseModule.models.CourseModel[] | null>;
}
