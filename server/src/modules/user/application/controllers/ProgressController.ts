import { inject, injectable } from "inversify";
import { IProgressController } from "./contracts";
import { TYPES } from "../../utils/TYPES";
import { IProgressService } from "../../domain/service";
import { Request, Response } from "express";
import { LoginSchema } from "../schemas/LoginSchema";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { ProgressInfoSchema } from "../schemas/ProgressInfoSchema";

@injectable()
export class ProgressController implements IProgressController {
  constructor(
    @inject(TYPES.ProgressService)
    private progressService: IProgressService 
  ) {}

  async getByCourseId(req: Request, res: Response){
    const data = {...req.body};
    const user = req.session.user;

    const { courseId } = ProgressInfoSchema.inputSchema.parse(data);
    const headProgress = this.progressService.getHeadProgressByCourseId(courseId);
    return res.status(200).json(headProgress)
  }
}
