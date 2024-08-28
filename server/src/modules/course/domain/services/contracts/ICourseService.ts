import { Request, Response } from "express";

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
  listByUser(email: string): Promise<any>;

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
