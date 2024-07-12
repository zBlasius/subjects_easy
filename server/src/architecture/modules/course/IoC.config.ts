import "reflect-metadata"
import { Container } from "inversify"
import * as repository from "./domain/repository"
import * as service from "./domain/services"
const container = new Container();

const TYPES = {
    CourseRepository: Symbol.for("ICourseRepository"),
    CourseService: Symbol.for("ICourseService"),
    };

// Repositories
container
    .bind<repository.ICourseRepository>(TYPES.CourseRepository)
    .to(repository.CourseRepository)

// Services
container
    .bind<service.ICourseService>(TYPES.CourseService)
    .to(service.CourseService)

export default container;