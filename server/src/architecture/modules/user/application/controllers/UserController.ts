import { inject, injectable } from "inversify";
import { IUserController } from "./contracts/IUserController";
import { TYPES } from "../../utils/TYPES";
import { IUserService } from "../../domain/service";

import { Request, Response} from "express";

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
}
