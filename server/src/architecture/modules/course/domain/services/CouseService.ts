import { CourseRepository } from "../repository/CourseRepository";
const courseRepository = new CourseRepository()

// TODO - Ver se faz sentido implementar a Model aqui
// TODO - Usar @inject aqui, e entender pra que serve
export class CourseService {

  constructor(properties:any) { //? O que colocar no lugar de "any" ?
  }

  // TODO - Deixar todos os erros estourarem na Controller
  async create(data:any){
    const newCourse = {
      User: "email",
      Name: "name",
      Description: "Description",
      StorageUsage: 0,
      VideoList: []
    }

    return courseRepository.create(newCourse);
  }

  async listByUser(){
    return courseRepository.listByFilter({user: "email do usuário"});
  }

  async getById(id:number){
    return courseRepository.listByFilter({id})
  }

  async updloadVideo(data:any){
    const dataToUpdate = data;
    const id = 123;
    dataToUpdate.VideoLink = "http://localhost:8080/temp/" + data.FileName; //! Fazer isso em outra função
    return courseRepository.update(id, data);
  }
}