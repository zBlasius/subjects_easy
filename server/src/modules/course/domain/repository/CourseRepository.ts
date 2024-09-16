import { injectable } from "inversify";
import Course from "../../../../database/mongodb/Course";
import Database from "../../../../database/mongodb/database"
import CourseModel from "../model/CourseModel";
import { ICourseRepository } from "./contracts";

@injectable()
export class CourseRepository implements ICourseRepository{
    constructor(){}
    
    async create(data:any){
        await Course.create(data);
    }

    async listByFilter(filter:any){
        //!todo - Ajustar
        const result = await Course.find({}); 
        if(!result) return;
        const list = result.map(item=> new CourseModel(item)) 
        return list;
    }

    async update(id:number, data:any){
        // return db.update(id, data);
    }

    async getById(id: string){
        const course = Course.findById(id);
        return new CourseModel(course);
    }
}
