import { injectable } from "inversify";
import Database from "../../../../../database/mongodb/database"
import CourseModel from "../model/CourseModel";
const db = new Database();

@injectable()
export class CourseRepository{
    constructor(){}
    
    async create(data:any){
        const course = await db.mongodbModels().course
        const find = await course.findById(data.id)
        return new CourseModel(course);
    }

    async listByFilter(filter:any){
        // const course = await db.list(filter);
        // return new CourseModel(course);
    }

    async update(id:number, data:any){
        // return db.update(id, data);
    }

    async getById(id: number){
        const user = await db.mongodbModels().user;
        const teste = user.findById(id);
        return new CourseModel(teste);
    }
}
