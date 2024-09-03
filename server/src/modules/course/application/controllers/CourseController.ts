import { injectable, inject } from "inversify";
import { ICourseController } from "./contracts/ICourseController";
import { ICourseService } from "../../domain/services";
import { Request, Response } from "express";
import { TYPES } from "../../utils";
import { CreateCourseSchema } from "../schemas/CreateCourseSchema";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject(TYPES.CourseService)
    private courseService: ICourseService
  ) {}

  async create(req: Request, res: Response) { 
    try {  
      const body = req.body;
      const data = CreateCourseSchema.inputSchema.parse({...body, ...req.session.user});
      await this.courseService.create(data);
  
      // TODO - Criar classe para lidar com status de retorno 
      return res.status(200).json({ ok: true }); 
    } catch (error) {
      // TODO - Fazer classe para lidar com erros
      throw new Error("course create error");
    }
  }

  async getUserCourses(req: Request, res: Response) {
    try {
      const { email } = { ...req.session.user };

      if (!email) {
        throw Error("Not authenticated"); 
      }

      const courseList = await this.courseService.listByUser(email);
      return courseList
    } catch (error) {
      // TODO - classe padronizando os erros
      throw Error("Error at listing courses")
    }
  }
}
