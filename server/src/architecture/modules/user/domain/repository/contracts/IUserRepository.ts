import { RegisterUserDb } from "../../../types";


export interface IUserRepository{

    register({username, email, password}:RegisterUserDb):Promise<void>;
    findByUsername(username:string):Promise<any>; // TODO - inserir a model no retorno desse type
    findById(id:string):Promise<any>
}