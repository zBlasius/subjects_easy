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

  async listActiveCourses(
    userId: string
  ): Promise<courseModule.models.CourseModel[] | null> {
    const headProgress = await this.progressService.getHeadProgressByUserId(
      userId
    );

    if (!headProgress) return null;
    courseModule;
    const listPromise = headProgress.map((item) =>
      this.courseService.getById(item.courseId.toString())
    );

    const solvedPromises = await Promise.all(listPromise);
    const finalList = solvedPromises.filter(
      (item): item is courseModule.models.CourseModel => item !== null
    );
    return finalList;
  }

  async listTeacherCourses(userId: string){
    return this.courseService.listByUserId(userId);
  }
}
