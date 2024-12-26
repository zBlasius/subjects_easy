import { injectable } from "inversify";
import { ISearchCodeRepository } from "./contracts";
import SearchCodes from "../../../../database/mongodb/SearchCodes";
import SearchCodeModel from "../model/SearchCodeModel";

@injectable()
export class SearchCodeRepository implements ISearchCodeRepository {
    constructor(){}

    async list(){
        const result = await SearchCodes.findOne({});  
        if(!result) return null;
        return new SearchCodeModel(result)
    }

    async create(table: string){
        const create = await SearchCodes.create({table, lastCode: 1})
        return new SearchCodeModel(create);
    }

    async update(id:string, data:{table: string, lastCode:number}){
        const update = await SearchCodes.updateOne(data)
        return new SearchCodeModel(update);
    }
}
