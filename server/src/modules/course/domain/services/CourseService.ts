import { inject, injectable } from "inversify";
import { ICourseService } from "./contracts";
import { ICourseRepository } from "../repository";
import { TYPES } from "../../utils";
// TODO - Ver se faz sentido implementar a Model aqui - faz sim

@injectable()
export class CourseService implements ICourseService{

  constructor(
    @inject(TYPES.CourseRepository)
    private courseRepository: ICourseRepository
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

  async getById(id:number){
    return this.courseRepository.getById(id)
  }

  async updloadVideo(data:any){
    const dataToUpdate = data;
    const id = 123;
    dataToUpdate.VideoLink = "http://localhost:8080/temp/" + data.FileName; //! Fazer isso em outra função
    return this.courseRepository.update(id, data);
  }
}