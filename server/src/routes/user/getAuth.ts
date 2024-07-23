import { Request, Response } from "express";
import {userModule} from "../../modules"
import { TYPES } from "../../modules/user/utils/TYPES"

export const postLogin = async (req: Request, res: Response) =>{
    return await userModule.container
    .get<userModule.IUserController>(TYPES.UserController)
    .login(req, res);
}