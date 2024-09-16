import { Request, Response } from "express";
import CourseModel from "../../model/CourseModel";

// TODO - Fazer funcionar
export interface ICourseService {
  /**
   *
   * Should create
   *
   */
  create(data: {
    userId: string;
    title: string;
    description: string;
  }): Promise<void>; //! Make better

  /**
   *
   * Should list
   *
   */
  listByUser(email: string): Promise<CourseModel[] | undefined>;

  /**
   *
   * Should get by id
   *
   */
  getById(id: string): Promise<CourseModel>;

  /**
   *
   * Should upload video
   */
  uploadVideo(data: any): Promise<any>;

  getDetails(courseId: string): Promise<CourseModel>;
}
