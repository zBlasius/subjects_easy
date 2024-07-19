import { stringMap } from "aws-sdk/clients/backup";
import { LoginInfo, RegisterInfo } from "../../../types";

/**
 * Interface for user services.
 */
export interface IUserService {

    /**
     * Logs in a user.
     * 
     * @param {LoginInfo} param0 - Login information.
     * @param {string} param0.username - Username.
     * @param {string} param0.password - User password.
     * @returns {Promise<any>} A promise that resolves when the login is successful.
     */
    login({username, password}: LoginInfo): Promise<string>; 

    /**
     * Registers a new user.
     * 
     * @param {RegisterInfo} param - Registration information.
     * @param {string} param.name - Full name of the user.
     * @param {string} param.username - Username.
     * @param {string} param.email - User email.
     * @param {string} param.type - User type.
     * @returns {Promise<void>} A promise that resolves when the registration is successful.
     */
    register({name, username, email, type, password}: RegisterInfo): Promise<void>;

    authenticate(token:string | undefined):Promise<string>;
}
