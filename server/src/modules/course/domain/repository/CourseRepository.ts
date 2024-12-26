import { injectable } from "inversify";
import Course from "../../../../database/mongodb/Course";
import { CourseModel } from "../model/CourseModel";
import { ICourseRepository } from "./contracts";

@injectable()
export class CourseRepository implements ICourseRepository{
    constructor(){}
    
    async create(data:any){
        await Course.create(data);
    }

    async listByFilter(filter:any){
        const result = await Course.find({}); 
        if(!result) return null;
        const list = result.map(item=> new CourseModel(item)) 
        return list;
    }

    async update(id:number, data:any){
    }

    async getById(id: string){
        const course = await Course.findById(id);
        if(!course) return null;
        return new CourseModel(course);
    }

    async listByLikeSearch(text: string){
        const regex = new RegExp(`.*${text}.*`); 
        const result = await Course.find({"nameSearch": regex})
        const list = result.map(item=> new CourseModel(item));
        if(!list || list.length === 0) return null;
        return list;
    }

    async getByCodeSearch(codeSearch: number){
        const result = await Course.findOne({codeSearch})
        if(!result) return null;
        return new CourseModel(result);
    }
}
