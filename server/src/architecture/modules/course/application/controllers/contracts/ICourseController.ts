import { Request, Response } from "express";
export interface ICourseController{

    // TODO - Melhorar isso aqui
    create(req:Request, res: Response): Promise<any>
}