import { injectable, inject } from "inversify";
import ICourseController from "./contracts/ICourseController";

@injectable()
class CourseController implements ICourseController {
  constructor() {}

  createCourse(data: any) {
    try {
      // return courseService.create(data);
    } catch (error) {
      // TODO - Fazer classe para lidar com erros
      throw new Error("course create error");
    }
  }
}

export default CourseController;
