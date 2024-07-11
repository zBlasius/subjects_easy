import Database from "../../../../../database/mongodb/database"
const db = new Database({name:"", email:"asdasd"});
// TODO - Montar arquitetura de login, para persistir dados de usuário da session

export class CourseRepository{
    constructor(){}
    
    async create(data:any){
        const dataToUpdate = data;
        return db.create(dataToUpdate)
    }

    async listByFilter(filter:any){
        return db.list(filter)
    }

    async update(id:number, data:any){
        return db.update(id, data);
    }

}
