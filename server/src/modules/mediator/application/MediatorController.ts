import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../utils";
import { IMediatorController } from "./contracts";
import { IMediatorService } from "../domain/contract/IMediatorService";


@injectable()
export class MediatorController implements IMediatorController {
  constructor(
    @inject(TYPES.MediatorService)
    private mediatorService: IMediatorService,
  ) {}

  async listActiveCourses(req: Request, res: Response) {
    try {
      const { userId, type } = { ...req.session.user };

      if (!userId) {
        throw new Error("Not authenticated");
      }

      if(type == "Student"){ 
        const courseList = await this.mediatorService.listActiveCourses(userId.toString()) 
        return res.status(200).json(courseList);
       }

       if(type == "Teacher"){
        const courseList = await this.mediatorService.listTeacherCourses(userId.toString()) 
        return res.status(200).json(courseList);
       } 
 
       return []
      
    } catch (error) {
      return res.status(500).send();;
    }
  }

}
