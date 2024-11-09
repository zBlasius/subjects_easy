import { Request, Response } from "express";
import { courseModule } from "../../modules"
import { TYPES } from "../../modules/course/utils"

export const getBySearch = async (req: Request, res: Response) =>{
    return await courseModule.container
    .get<courseModule.ICourseController>(TYPES.CourseController)
    .getBySearch(req, res)
}