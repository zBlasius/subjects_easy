import CourseModel from "../../../../../models/CourseModel";
import { CourseService } from "../../model/course/services/CouseService";
const courseService = new CourseService({});

interface UserAuth {
  email: string;
}

interface NewCourseData {
  User: string;
  Name: string;
  Description: string;
  StorageUsage: number;
  FileName: string;
  VideoList: [
    {
      Title: string;
      Description: string;
      StorageUsage: number;
      VideoLink: string;
    }
  ];
}

interface NewVideo {
  Title: string;
  Description: string;
  StorageUsage: number;
  VideoLink: string;
  FileName: string;
  courseId: string;
}

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
