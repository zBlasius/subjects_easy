import HeadProgress from "../../../../database/mongodb/HeadProgress"; // TODO - pensar em um jeito melhor
import { injectable } from "inversify";
import { IHeadProgressRepository } from "./contracts";
import { HeadProgressModel } from "../model";

@injectable()
export class HeadProgressRepository implements IHeadProgressRepository {
  constructor() {}

  async findByCourseId(courseId: string) {
    const headProgress = await HeadProgress.findOne({courseId}).exec();
    if (!headProgress) return null;
    return new HeadProgressModel(headProgress);
  }

}
