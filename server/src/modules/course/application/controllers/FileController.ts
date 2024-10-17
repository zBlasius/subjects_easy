import { injectable, inject } from "inversify";
import { IFileService } from "../../domain/services";
import { Request, Response } from "express";
import { TYPES } from "../../utils";
import {
  FileCreateSchema,
} from "../schemas";
import { IFileController } from "./contracts";

@injectable()
export class FileController implements IFileController {
  constructor(
    @inject(TYPES.FileService)
    private fileService: IFileService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const file = req.file;
      const body = req.body;

      if (!file) {
        throw new Error("Upload without file");
      }

      const data = FileCreateSchema.inputSchema.parse({
        ...body,
        file: file.buffer,
        mimeType: file.mimetype,
        ...req.session.user,
      });
      await this.fileService.create(data);
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send();
    }
  }
}
