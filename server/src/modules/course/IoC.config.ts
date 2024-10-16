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
container
    .bind<repository.IFileRepository>(TYPES.FileRepository)
    .to(repository.FileRepository)

// Services
container
    .bind<service.ICourseService>(TYPES.CourseService)
    .to(service.CourseService);
container
    .bind<service.IFileService>(TYPES.FileService)
    .to(service.FileService)
container
    .bind<service.IS3Service>(TYPES.S3Service)
    .to(service.S3Service)

// Controller
container
    .bind<controller.ICourseController>(TYPES.CourseController)
    .to(controller.CourseController);
container
    .bind<controller.IFileController>(TYPES.FileController)
    .to(controller.FileController);

export default container;