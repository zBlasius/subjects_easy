import { stringMap } from "aws-sdk/clients/backup";
import { LoginInfo, RegisterInfo } from "../../../types";
import { UserModel } from "../../model";

/**
 * Interface for user services.
 */
export interface IUserService {
  /**
   * Logs in a user.
   *
   * @param {LoginInfo} param0 - Login information.
   * @param {string} param0.fullName - fullName.
   * @param {string} param0.password - User password.
   * @returns {Promise<any>} A promise that resolves when the login is successful.
   */
  login({ email, password }: LoginInfo): Promise<string>;

  /**
   * Registers a new user.
   *
   * @param {RegisterInfo} param - Registration information.
   * @param {string} param.name - Full name of the user.
   * @param {string} param.fullName - fullName.
   * @param {string} param.email - User email.
   * @param {string} param.type - User type.
   * @returns {Promise<void>} A promise that resolves when the registration is successful.
   */
  register({
    fullName,
    email,
    type,
    password,
  }: RegisterInfo): Promise<void>;

  /**
   * Authenticates a user based on the provided token.
   *
   * @param {string | undefined} token - The authentication token. If undefined, authentication will fail.
   * @returns {Promise<string>} A promise that resolves to a string indicating the authentication result.
   */
  authenticate(token: string | undefined): Promise<UserModel>;
}
