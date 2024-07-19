import { Request, Response } from "express";
import {courseModule, userModule} from "../../architecture/modules"
import { TYPES } from "../../architecture/modules/user/utils/TYPES"

export const authenticate = async (req: Request, res: Response) =>{
    return await userModule.container
    .get<userModule.IUserController>(TYPES.UserController)
    .authenticate(req, res);
}