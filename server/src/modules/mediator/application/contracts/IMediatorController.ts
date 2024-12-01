import { Request, Response } from "express";

export interface IMediatorController {
  listActiveCourses(req: Request, res: Response): Promise<any>
}
