import { injectable, inject } from "inversify";
import { ICourseController } from "./contracts/ICourseController";
import { ICourseService } from "../../domain/services";
import { Request, Response } from "express";
import { TYPES } from "../../utils";
import { CreateCourseSchema, getDetailsSchema } from "../schemas";

@injectable()
export class CourseController implements ICourseController {
  constructor(
    @inject(TYPES.CourseService)
    private courseService: ICourseService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const data = CreateCourseSchema.inputSchema.parse({
        ...body,
        ...req.session.user,
      });
      await this.courseService.create(data);

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500);
    }
  }

  async getUserCourses(req: Request, res: Response) {
    try {
      const { email } = { ...req.session.user };

      if (!email) {
        throw new Error("Not authenticated");
      }

      const courseList = await this.courseService.listByUser(email);
      return res.status(200).json(courseList);
    } catch (error) {
      return res.status(500);
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const { courseId } = getDetailsSchema.inputSchema.parse({
        ...req.query,
      });

      const courseDetail = await this.courseService.getDetails(courseId);
      return res.status(200).json(courseDetail);
    } catch (error) {
      return res.status(500);
    }
  }
}
