import { Request, Response } from "express";
import {courseModule} from "../../architecture/modules"

export const postCreateCourse = async (req: Request, res: Response) =>{
    return await courseModule.container
    .get<courseModule.ICourseController>("ICourseController")
    .create(req, res)
}