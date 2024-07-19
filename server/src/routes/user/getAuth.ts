import { Request, Response } from "express";
import {userModule} from "../../architecture/modules"
import { TYPES } from "../../architecture/modules/user/utils/TYPES"

export const postLogin = async (req: Request, res: Response) =>{
    console.log(req.body)
    return await userModule.container
    .get<userModule.IUserController>(TYPES.UserController)
    .login(req, res);
}