import { ObjectId } from "mongodb";

export default class SearchCodeModel{
    id: string | ObjectId;
    table: string;
    lastCode: number;

    constructor(properties:any){
        this.id = properties.id;
        this.table = properties.table;
        this.lastCode = properties.lastCode;
    }
}