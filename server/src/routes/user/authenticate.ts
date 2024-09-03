import { Request, Response } from "express";
import {courseModule, userModule} from "../../modules"
import { TYPES } from "../../modules/user/utils/TYPES"

export const authenticate = async (req: Request, res: Response, next:any) =>{
    return await userModule.container
    .get<userModule.IUserController>(TYPES.UserController)
    .authenticate(req, res, next);
}