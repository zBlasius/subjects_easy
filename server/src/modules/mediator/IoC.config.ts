import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./utils";
import * as courseModule from "../course";
import * as userModule from "../user";
import * as controller from "./application";
const container = new Container();

// Services
container
    .bind<courseModule.services.ICourseService>(TYPES.CourseService)
    .to(courseModule.services.CourseService);
container
    .bind<userModule.services.IProgressService>(TYPES.ProgressService)
    .to(userModule.services.ProgressService);

// Controller
container
    .bind<controller.IMediatorController>(TYPES.MediatorController)
    .to(controller.MediatorController);

export default container;