import { RegisterUserDb } from "../../types";
import { UserModel } from "../../model";


export interface IUserRepository{

    register({fullName, email, password, type}:RegisterUserDb):Promise<void>;
    findByEmail(email:string):Promise<UserModel | null>; // TODO - inserir a model no retorno desse type
    findById(id:string):Promise<UserModel | null>
}