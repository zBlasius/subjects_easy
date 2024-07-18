import { injectable } from "inversify";
import { IUserController } from "./contracts/IUserController";

@injectable()
export class UserController implements IUserController{
    constructor(){}
}