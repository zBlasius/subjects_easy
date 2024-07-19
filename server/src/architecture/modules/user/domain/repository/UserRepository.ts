import User from "../../../../../database/mongodb/User"; // TODO - pensar em um jeito melhor
import { injectable } from "inversify";
import { RegisterUserDb } from "../../types";
import { IUserRepository } from "./contracts";

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
