import { Request, Response } from "express";

export interface IUserController{
    authenticate(req: Request, res: Response):Promise<any> // TODO - fazer jsdocs
    login(req: Request, res: Response):Promise<any> // TODO - fazer jsdocs
    register(req: Request, res: Response):Promise<any> // TODO - fazer jsdocs
}