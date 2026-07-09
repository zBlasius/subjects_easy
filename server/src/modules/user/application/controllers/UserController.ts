import { inject, injectable } from "inversify";
import { IUserController } from "./contracts/IUserController";
import { TYPES } from "../../utils/TYPES";
import { IUserService } from "../../domain/service";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/LoginSchema";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { ProgressInfoSchema } from "../schemas/ProgressInfoSchema";
import AppException from "../../../utils/Exception";

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
      if (!user) throw new AppException("Unauthenticated", 401);
      req.session.user = { ...user };
      next();
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response) {
    const parsed = LoginSchema.inputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const result = await this.userService.login(parsed.data);
    if (!result.ok) return res.status(401).json({ error: result.error.type });

    const userInfo = await this.userService.getBasicInfo(parsed.data.email);
    const parsedResponse = LoginSchema.outputSchema.parse({ token: result.data, userInfo });
    return res.status(200).json(parsedResponse);
  }

  async register(req: Request, res: Response) {
    const parsed = RegisterSchema.inputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
    }

    const result = await this.userService.register(parsed.data);
    if (!result.ok) return res.status(409).json({ error: result.error.type });

    return res.status(200).json();
  }
 
} 
 