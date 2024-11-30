import { Container } from "inversify";
import * as repository from "./domain/repository";
import * as services from "./domain/service"
import * as controller from "./application/controllers"
import { TYPES } from "./utils/TYPES";
const container = new Container();

// Repository
container
    .bind<repository.IUserRepository>(TYPES.UserRepository)
    .to(repository.UserRepository)
container
    .bind<repository.IHeadProgressRepository>(TYPES.HeadProgressRepository)
    .to(repository.HeadProgressRepository)

// Service
container
    .bind<services.IUserService>(TYPES.UserService)
    .to(services.UserService)
container
    .bind<services.IProgressService>(TYPES.ProgressService)
    .to(services.ProgressService)

// Controllers
container
    .bind<controller.IUserController>(TYPES.UserController)
    .to(controller.UserController)

export default container;