import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./utils";
import * as courseModule from "../course";
import * as userModule from "../user";
import * as service from "./domain";
import * as controller from "./application";
const container = new Container();

//! URGENT TODO: Any new service/controller/repository created must be configure here. It's bad for code, fix it
// Services
container
  .bind<courseModule.services.ICourseService>(TYPES.CourseService)
  .to(courseModule.services.CourseService);
container
  .bind<courseModule.services.IFileService>(TYPES.FileService)
  .to(courseModule.services.FileService);
container
  .bind<courseModule.services.IS3Service>(TYPES.S3Service)
  .to(courseModule.services.S3Service);
container
  .bind<courseModule.services.ISearchCodeService>(TYPES.SearchCodeService)
  .to(courseModule.services.SearchCodeService)
container
  .bind<userModule.services.IProgressService>(TYPES.ProgressService)
  .to(userModule.services.ProgressService);
container
  .bind<service.IMediatorService>(TYPES.MediatorService)
  .to(service.MediatorService);

// Repository
container
  .bind<courseModule.repositorys.ICourseRepository>(TYPES.CourseRepository)
  .to(courseModule.repositorys.CourseRepository);
container
  .bind<courseModule.repositorys.IFileRepository>(TYPES.FileRepository)
  .to(courseModule.repositorys.FileRepository);
container
  .bind<courseModule.repositorys.ISearchCodeRepository>(TYPES.SearchCodeRepository)
  .to(courseModule.repositorys.SearchCodeRepository)
container
  .bind<userModule.repositorys.IHeadProgressRepository>(
    TYPES.HeadProgressRepository
  )
  .to(userModule.repositorys.HeadProgressRepository);

// Controller
container
  .bind<controller.IMediatorController>(TYPES.MediatorController)
  .to(controller.MediatorController);

export default container;
