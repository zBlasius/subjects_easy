import { inject, injectable } from "inversify";
import { ICourseService } from "./contracts";
import { ICourseRepository } from "../repository";
import "reflect-metadata"

// TODO - Ver se faz sentido implementar a Model aqui

const TYPES = {
  CourseRepository: Symbol.for("ICourseRepository")
  };
@injectable()
export class CourseService implements ICourseService{

  constructor(
    @inject(TYPES.CourseRepository)
    private courseRepository: ICourseRepository
  ) {}
 
  async create(data:any){
    const newCourse = {
      User: "email",
      Name: "name",
      Description: "Description",
      StorageUsage: 0,
      VideoList: []
    }

    return this.courseRepository.create(newCourse);
  }

  async listByUser(){
    return this.courseRepository.listByFilter({user: "email do usuário"});
  }

  async getById(id:number){
    return this.courseRepository.listByFilter({id})
  }

  async updloadVideo(data:any){
    const dataToUpdate = data;
    const id = 123;
    dataToUpdate.VideoLink = "http://localhost:8080/temp/" + data.FileName; //! Fazer isso em outra função
    return this.courseRepository.update(id, data);
  }
}