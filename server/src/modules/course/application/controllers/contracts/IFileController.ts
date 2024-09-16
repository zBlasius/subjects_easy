import { Request, Response } from "express";

export interface IFileController {
  create(req: Request, res: Response): Promise<any>; //! Make better
}
