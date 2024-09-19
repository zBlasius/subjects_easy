import { IUserService } from "./contracts/IUserService";
import { LoginInfo, RegisterInfo } from "../../types";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../utils/TYPES";
import { IUserRepository } from "../repository";
import jwt from "jsonwebtoken";
import { env } from "node:process";
const getEnv = (key: string): string => (env[key] ? (env[key] as string) : "");

interface JwtPayload {
  userId: string;
}
@injectable()
export class UserService implements IUserService {
  secretKey: string
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {
    this.secretKey = process.env.SECRET_MONGODB_KEY || "";
  }

  async login({ email, password }: LoginInfo) {
    try {
      
      const user = await this.userRepository.findByEmail(email);
      
      if (!user) { 
        throw new Error("Something goes wrong!"); 
      } 
      
      const passwordMatch = await this.comparePassword(password, user.password);
      
      if (!passwordMatch) {
        throw new Error("Something goes wrong!"); //TODO - melhorar
      }
      
      const token = jwt.sign({ userId: user.userId }, this.secretKey, {
        expiresIn: "1 hour",
      });
      return token;
    } catch (error) {
      console.log('error', error)  
      throw "Invalid Login"
    }
  }

  private async comparePassword(
    candidatePassword: string,
    userPassword: string
  ) {
    const isEqual = await bcrypt.compare(candidatePassword, userPassword);
    return isEqual;
  }

  async register({
    fullName,
    email,
    password,
    type,
  }: RegisterInfo): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error("Email already exists");
    }

    await this.userRepository.register({
      fullName,
      email,
      password,
      type,
    });

    return;
  }

  async authenticate(token: string) {
    if (!token) throw new Error("Authentication required");

    try {
      const decodedToken = jwt.verify(
        token,  
        this.secretKey
      ) as JwtPayload;
      const user = await this.userRepository.findById(decodedToken.userId);
      if (!user) throw "Invalid token"; //TODO  - melhorar esse retorno
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
