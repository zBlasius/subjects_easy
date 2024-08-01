import User from "../../../../database/mongodb/User"; // TODO - pensar em um jeito melhor
import { injectable } from "inversify";
import { RegisterUserDb } from "../../types";
import { IUserRepository } from "./contracts";

@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async register({ fullName, email, password, type }: RegisterUserDb) {
    try {
      const user = new User({ fullName, email, password, type });
      await user.save();
      return;
    } catch (error) {
        //TODO - melhorar isso depois
        throw error;
    }
  }

  // TODO - refazer essa função para realizar um filtro genérico
  async findByEmail(email:string){
    return User.findOne({email}) // TODO - fazer o retorno utilizando a model 
  }

  async findById(id:string){
    return User.findById(id);
  }
}
