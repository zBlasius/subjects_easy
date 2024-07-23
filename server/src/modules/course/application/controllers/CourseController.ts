import { injectable, inject } from "inversify";
import { ICourseController } from "./contracts/ICourseController";
import { ICourseService } from "../../domain/services";
import { Request, Response } from "express";
import { TYPES } from "../../utils";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject(TYPES.CourseService)
    private courseService: ICourseService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      await this.courseService.create(data);
      
      // TODO - Criar classe para lidar com status de retorno
      return res.status(200).json({ok:true})

    } catch (error) { 
      // TODO - Fazer classe para lidar com erros
      throw new Error("course create error");
    }
  }
}

