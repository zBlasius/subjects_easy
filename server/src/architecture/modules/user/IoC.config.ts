import { Container } from "inversify";
import * as repository from "./domain/repository";
import * as service from "./domain/service"
import * as controller from "./application/controllers"
import { TYPES } from "./utils/TYPES";
const container = new Container();

// Repository
container
    .bind<repository.IUserRepository>(TYPES.UserRepository)
    .to(repository.UserRepository)

// Service
container
    .bind<service.IUserService>(TYPES.UserService)
    .to(service.UserService)

// Controllers
container
    .bind<controller.IUserController>(TYPES.UserController)
    .to(controller.UserController)

export default container;