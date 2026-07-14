import { IUserService } from "./contracts/IUserService";
import { LoginInfo, RegisterInfo } from "../../types";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../utils/TYPES";
import { IUserRepository } from "../../architeture";
import jwt from "jsonwebtoken";
import { env } from "node:process";
import { Result } from "../../../utils/Result";
import AppException from "../../../utils/Exception";
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

  // TODO - Write tests here
  async login({ email, password }: LoginInfo): Promise<Result<string>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return { ok: false, error: { type: "INVALID_CREDENTIALS" } };

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) return { ok: false, error: { type: "INVALID_CREDENTIALS" } };

    const token = jwt.sign({ userId: user.userId }, this.secretKey, { expiresIn: "1h" });
    return { ok: true, data: token };
  }

  // TODO - Write tests here
  private async comparePassword(
    candidatePassword: string,
    userPassword: string
  ) {
    const isEqual = await bcrypt.compare(candidatePassword, userPassword);
    return isEqual;
  }

  // TODO - Write tests here
  async register({ fullName, email, password, type }: RegisterInfo): Promise<Result<void>> {
    const user = await this.userRepository.findByEmail(email);

    if (user) return { ok: false, error: { type: "EMAIL_ALREADY_EXISTS" } };

    await this.userRepository.register({ fullName, email, password, type });
    return { ok: true, data: undefined };
  }

  // TODO - Write tests here
  async authenticate(token: string | undefined) {
    if (!token) throw new AppException("Authentication required", 401);

    try {
      const decodedToken = jwt.verify(token, this.secretKey) as JwtPayload;
      const user = await this.userRepository.findById(decodedToken.userId);
      if (!user) throw new AppException("Invalid token", 401);
      return user;
    } catch (error) {
      if (error instanceof AppException) throw error;
      throw new AppException("Invalid token", 401);
    }
  }

  // TODO - Write tests here
  async getBasicInfo(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user?.toBasicInfo();
  }
}
