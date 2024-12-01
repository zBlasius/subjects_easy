import { inject, injectable } from "inversify";
import { TYPES } from "../utils";
import { IMediatorService } from "./contract/IMediatorService";
import { courseModule, userModule } from "../..";

@injectable()
export class MediatorService implements IMediatorService {
  constructor(
    @inject(TYPES.CourseService)
    private courseService: courseModule.services.ICourseService,
    @inject(TYPES.ProgressService)
    private progressService: userModule.services.IProgressService
  ) {}

  async listActiveCourses(courseId: string, userId: string){
    const promise = await this.courseService.listByUser("123")
    return promise;
  }
}
