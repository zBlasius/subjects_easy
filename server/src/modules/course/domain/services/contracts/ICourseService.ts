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
  getById(id: number): Promise<any>;

  /**
   *
   * Should upload video
   */
  updloadVideo(data: any): Promise<any>;
}
