import { Request, Response } from "express";
export interface ICourseController{

    create(req:Request, res: Response): Promise<any>; //! Make better
    getUserCourses(req:Request, res: Response): Promise<any>; //! Make better
} 