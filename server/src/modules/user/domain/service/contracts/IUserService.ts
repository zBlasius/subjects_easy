import { LoginInfo, RegisterInfo } from "../../../types";
import { UserModel } from "../../../model";
import { UserInfoDTO } from "../../dto/UserInfoDTO";
import { Result } from "../../../../utils/Result";

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
   * @returns {Promise<Result<string>>} A promise that resolves with the token or a business error.
   */
  login({ email, password }: LoginInfo): Promise<Result<string>>;

  /**
   * Registers a new user.
   *
   * @param {RegisterInfo} param - Registration information.
   * @param {string} param.name - Full name of the user.
   * @param {string} param.fullName - fullName.
   * @param {string} param.email - User email.
   * @param {string} param.type - User type.
   * @returns {Promise<Result<void>>} A promise that resolves when the registration is successful or a business error.
   */
  register({
    fullName,
    email,
    type,
    password,
  }: RegisterInfo): Promise<Result<void>>;

  /**
   * Authenticates a user based on the provided token.
   *
   * @param {string | undefined} token - The authentication token. If undefined, authentication will fail.
   * @returns {Promise<string>} A promise that resolves to a string indicating the authentication result.
   */
  authenticate(token: string | undefined): Promise<UserModel>;

  getBasicInfo(email: string): Promise<UserInfoDTO | undefined>;
}
