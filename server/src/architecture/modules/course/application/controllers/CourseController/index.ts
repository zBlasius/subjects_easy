import { CourseService } from "../../../domain/services/CourseService";
const courseService = new CourseService({});

class CourseController {
  constructor(properties: any) {}

  createCourse(data: any) {
    try {
      return courseService.create(data);
    } catch (error) {
      // TODO - Fazer classe para lidar com erros
      throw new Error("course create error");
    }
  }
}

export default CourseController;
