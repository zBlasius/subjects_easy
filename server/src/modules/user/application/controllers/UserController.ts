import { inject, injectable } from "inversify";
import { IUserController } from "./contracts/IUserController";
import { TYPES } from "../../utils/TYPES";
import { IUserService } from "../../domain/service";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/LoginSchema";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(TYPES.UserService)
    private userService: IUserService
  ) {}

  async authenticate(req: Request, res: Response) {
    try {
      const token = req.header("Authorization");
      await this.userService.authenticate(token);

      // TODO - Criar classe para lidar com status de retorno
      return res.status(200).json({ ok: true });
    } catch (error) {
      // TODO - Fazer classe para lidar com erros
      throw new Error("course create error");
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password} = LoginSchema.inputSchema.parse({...req.body}); //! Por que utilizar?
      const token = await this.userService.login({ username, password });
      const parsedResponse = LoginSchema.outputSchema.parse({token})
      return res.status(200).json(parsedResponse);
    } catch (error) {
      return res.status(400).json({ message: "invalid login" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, name, type } = req.body;
      await this.userService.register({ username, email, password, name, type});
      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ message: "invalid login" });
    }
  }
}
