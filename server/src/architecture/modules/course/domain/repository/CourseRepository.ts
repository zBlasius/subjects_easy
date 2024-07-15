import Database from "../../../../../database/mongodb/database"
import CourseModel from "../model/CourseModel";
const db = new Database();

export class CourseRepository{
    constructor(){}
    
    async create(data:any){
        const course = await db.course().findById(data.id)
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
        const course = await db.course().findById(id)
        return new CourseModel(course);
    }
}
