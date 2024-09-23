import { inject, injectable } from "inversify";
import { ICourseService, IFileService } from "./contracts";
import { ICourseRepository } from "../repository";
import { TYPES } from "../../utils";
import CourseModel from "../model/CourseModel";

@injectable()
export class CourseService implements ICourseService{

  constructor(
    @inject(TYPES.CourseRepository)
    private courseRepository: ICourseRepository,
    @inject(TYPES.FileService)
    private fileService: IFileService
  ) {}
 
  async create(data:any){
    
    const newCourse = { 
      userId: data.userId,
      title: data.title,
      description: data.description,
    } 

    return this.courseRepository.create(newCourse);
  }

  async listByUser(email:string){
    return this.courseRepository.listByFilter({user: email});
  }

  async getById(id:string){
    return this.courseRepository.getById(id)
  }

  async getDetails(courseId: string){ 
    const videoList = await this.fileService.listByCourseId(courseId)
    const course = await this.courseRepository.getById(courseId);
    const obj = {...course, videoList}
    return new CourseModel(obj);
  } 
}