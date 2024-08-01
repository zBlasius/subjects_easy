import { RegisterUserDb } from "../../../types";


export interface IUserRepository{

    register({fullName, email, password, type}:RegisterUserDb):Promise<void>;
    findByEmail(email:string):Promise<any>; // TODO - inserir a model no retorno desse type
    findById(id:string):Promise<any>
}