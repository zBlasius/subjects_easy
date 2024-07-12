import Database from "../../../../../database/mongodb/database"
import CourseModel from "../model/CourseModel";
const db = new Database({name:"", email:"asdasd"});

export class CourseRepository{
    constructor(){}
    
    async create(data:any){
        const dataToUpdate = data;
        return db.create(dataToUpdate)
    }

    async listByFilter(filter:any){
        const course = await db.list(filter);
        return new CourseModel(course);
    }

    async update(id:number, data:any){
        return db.update(id, data);
    }
}
