import { Request, Response } from "express";
import {courseModule} from "../../architecture/modules"
import { TYPES } from "../../architecture/modules/course/utils"

export const postCreateCourse = async (req: Request, res: Response) =>{
    return await courseModule.container
    .get<courseModule.ICourseController>(TYPES.CourseController)
    .create(req, res)
}