import { Request, Response } from "express";

export interface IProgressController{
    getByCourseId(req: Request, res: Response): Promise<any>;
    activateCourse(req: Request, res: Response): Promise<any>;
}