
import { courseModule } from "../../..";

export interface IMediatorService {
  
  listActiveCourses(courseId: string, userId: string): Promise<courseModule.models.CourseModel[] | null>;
}
