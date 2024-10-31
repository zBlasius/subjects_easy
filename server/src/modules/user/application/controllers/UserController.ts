import { inject, injectable } from "inversify";
import { IUserController } from "./contracts/IUserController";
import { TYPES } from "../../utils/TYPES";
import { IUserService } from "../../domain/service";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/LoginSchema";
import { RegisterSchema } from "../schemas/RegisterSchema";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(TYPES.UserService)
    private userService: IUserService 
  ) {}

  async authenticate(req: Request, res: Response, next: any) {
    try {
      const token = req.header("Authorization"); 
      const user = await this.userService.authenticate(token);
      if(!user) throw "Not authenticated"; 
      req.session.user = {...user};
       
      next();
    } catch (error) {
      res.status(500).json({message: "Unauthenticated"})
      throw new Error("course create error"); 
    } 
  }
 
  async login(req: Request, res: Response) {
    try {
      const { email, password} = LoginSchema.inputSchema.parse({...req.body});
      const token = await this.userService.login({ email, password });
      const basicInfo = await this.userService.getBasicInfo(email);
      const parsedResponse = LoginSchema.outputSchema.parse({token})
      return res.status(200).json(parsedResponse);
    } catch (error) {
      return res.status(400).json({ message: "invalid login" });
    }
  }

  async register(req: Request, res: Response) { 
    try {   
      const data = {...req.body};
      const { fullName, email, password, type } = RegisterSchema.inputSchema.parse(data);
      await this.userService.register({ fullName, email, password, type});
      return res.status(200).json();
    } catch (error) {
      
      if(error instanceof Error && error.name == "ZodError"){
        // TODO - Padronizar erros
      }
      return res.status(400).json({ error });
    }
  }
} 
 