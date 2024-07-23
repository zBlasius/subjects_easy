import "reflect-metadata"
import { Container } from "inversify"
import { TYPES } from "./utils"
import * as repository from "./domain/repository"
import * as service from "./domain/services"
import * as controller from "./application/controllers"
const container = new Container();

// Repositories
container
    .bind<repository.ICourseRepository>(TYPES.CourseRepository)
    .to(repository.CourseRepository);

// Services
container
    .bind<service.ICourseService>(TYPES.CourseService)
    .to(service.CourseService);

// Controller
container
    .bind<controller.ICourseController>(TYPES.CourseController)
    .to(controller.CourseController);

export default container;