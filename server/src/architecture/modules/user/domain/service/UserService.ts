import { IUserService } from "./contracts/IUserService";
import { LoginInfo, RegisterInfo } from "../../types";
import bcrypt from "bcrypt"

export class UserService implements IUserService{
    constructor(){}

    async login({username, password}:LoginInfo): Promise<void>{
        
    }

    async register({ name, username, email, type, password }: RegisterInfo): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            // const user
        } catch (error) {
            
        }
    }
}