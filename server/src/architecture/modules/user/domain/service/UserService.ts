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
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async login({ username, password }: LoginInfo){
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("Something goes wrong!");
    }

    const passwordMatch = await this.comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new Error("Something goes wrong!"); //TODO - melhorar
      }

    const token = jwt.sign({ userId: user._id }, getEnv("SECRET_MONGODB_KEY"), {
      expiresIn: "1 hour",
    });
    return token;
  }

  private async comparePassword(
    candidatePassword: string,
    userPassword: string
  ) {
    const isEqual = await bcrypt.compare(candidatePassword, userPassword);
    return isEqual;
  }

  async register({
    username,
    email,
    password,
  }: RegisterInfo): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userRepository.register({
        username,
        email,
        password: hashedPassword,
      });
      return;
    } catch (error) {}
  }

  async authenticate(token:string){
    if(!token) throw new Error("Authentication required");

    try {
        const decodedToken = jwt.verify(token, getEnv("SECRET_MONGODB_KEY")) as JwtPayload;
        const user = this.userRepository.findById(decodedToken.userId)
        return user;
    } catch (error) {
        throw new Error("Invalid token")
    }
  }
}
