import { Request, Response } from "express";

// TODO - Fazer funcionar
export interface ICourseService {
  /**
   *
   * Should get a creditRelease
   *
   * @req express req object
   * @res express res object
   *
   */
  get(req: Request, res: Response): Promise<any>;

  /**
   *
   * Should get a creditRelease List
   *
   * @req express req object
   * @res express res object
   *
   */
  getList(req: Request, res: Response): Promise<any>;

  /**
   *
   * Should create a creditRelease
   *
   * @req express req object
   * @res express res object
   *
   */
  post(req: Request, res: Response): Promise<any>;

  /**
   *
   * Should create a creditRelease
   *
   * @req express req object
   * @res express res object
   *
   */
  postPixTransaction(req: Request, res: Response): Promise<any>;

  /**
   *
   * Should create a creditRelease
   *
   * @req express req object
   * @res express res object
   *
   */
  getPix(req: Request, res: Response): Promise<any>;
}
