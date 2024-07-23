import { Request, Response } from "express";

// TODO - Fazer funcionar
export interface ICourseService {
  /**
   *
   * Should create
   *
   */
  create(data:any): Promise<any>;

  /**
   *
   * Should list
   *
   */
  listByUser(): Promise<any>;

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
  updloadVideo(data:any): Promise<any>;

}
