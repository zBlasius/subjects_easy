import Database from "../../../../../database/mongodb/database";
import { injectable } from "inversify";
import { RegisterUserDb } from "../../types";
import User from "../../../../../database/mongodb/User";
import { IUserRepository } from "./contracts";
const db = new Database();

@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async register({ username, email, password }: RegisterUserDb) {
    try {
      const user = new User({ username, email, password });
      await user.save();
      return;
    } catch (error) {
        console.log('error', error)
        //TODO - melhorar isso depois
        throw error;
    }
  }

  // TODO - refazer essa função para realizar um filtro genérico
  async findByUsername(username:string){
    return User.findOne({username}) // TODO - fazer o retorno utilizando a model 
  }

  async findById(id:string){
    return User.findById(id);
  }
}
