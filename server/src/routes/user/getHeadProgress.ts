import { Request, Response } from "express";
import { userModule } from "../../modules"
import { TYPES } from "../../modules/user/utils/TYPES"

export const getHeadProgress = async (req: Request, res: Response) =>{
    return await userModule.container
    .get<userModule.IProgressController>(TYPES.ProgressController)
    .getByCourseId(req, res);
}