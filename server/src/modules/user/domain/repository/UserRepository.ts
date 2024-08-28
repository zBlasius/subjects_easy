import User from "../../../../database/mongodb/User"; // TODO - pensar em um jeito melhor
import { injectable } from "inversify";
import { RegisterUserDb } from "../../types";
import { IUserRepository } from "./contracts";
import { UserModel } from "../model";
import { ObjectId } from "mongodb"
@injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async register({ fullName, email, password, type }: RegisterUserDb) {
    try {
      const user = new User({ fullName, email, password, type });
      await user.save();
    } catch (error) {
      //TODO - melhorar isso depois
      throw error;
    }
  }

  async findByEmail(email: string) {
    const user = await User.findOne({email}).exec();
    if (!user) return null;
    return new UserModel(user);
  }

  async findById(id: string) {
    const user = await User.findById(id);
    if (!user) return null;
    return new UserModel(user);
  }
}
