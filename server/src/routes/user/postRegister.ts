import { Request, Response } from "express";
import {userModule} from "../../architecture/modules"
import { TYPES } from "../../architecture/modules/user/utils/TYPES"

export const postRegister = async (req: Request, res: Response) =>{
    return await userModule.container
    .get<userModule.IUserController>(TYPES.UserController)
    .register(req, res);
}