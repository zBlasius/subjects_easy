import { injectable } from "inversify";
import Course from "../../../../../database/mongodb/Course";
import Database from "../../../../../database/mongodb/database"
import CourseModel from "../model/CourseModel";

@injectable()
export class CourseRepository{
    constructor(){}
    
    async create(data:any){
        const course = await Course.findById(data.id)
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
        const course = Course.findById(id);
        return new CourseModel(course);
    }
}
