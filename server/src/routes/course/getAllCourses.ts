import { Request, Response } from "express";
import { mediatorModule } from "../../modules"
import { TYPES } from "../../modules/mediator/utils"

export const getAllCourses = async (req: Request, res: Response) =>{
    return await mediatorModule.container
    .get<mediatorModule.IMediatorController>(TYPES.MediatorController)
    .listActiveCourses(req, res)
}