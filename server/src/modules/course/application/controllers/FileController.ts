import { injectable, inject } from "inversify";
import { ICourseController } from "./contracts/ICourseController";
import { ICourseService, IFileService } from "../../domain/services";
import { Request, Response } from "express";
import { TYPES } from "../../utils";
import { CreateCourseSchema, FileCreateSchema, getDetailsSchema } from "../schemas";
import { IFileController } from "./contracts";

@injectable()
export class FileController implements IFileController {
  constructor(
    @inject(TYPES.FileService)
    private fileService: IFileService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const data = FileCreateSchema.inputSchema.parse({
        ...body,
        ...req.session.user,
      });
      await this.fileService.create(data);

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500);
    }
  }

}
