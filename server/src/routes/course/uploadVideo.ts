import { Request, Response } from "express";
import {courseModule} from "../../modules"
import { TYPES } from "../../modules/course/utils"

export const uploadVideo = async (req: Request, res: Response) =>{
    return await courseModule.container
    .get<courseModule.IFileController>(TYPES.FileController)
    .create(req, res)
}