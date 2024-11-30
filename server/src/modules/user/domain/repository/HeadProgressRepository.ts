import HeadProgress from "../../../../database/mongodb/HeadProgress";
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

  async createHeadProgress(courseId: string, userId: string){
    const headProgressObj = new HeadProgress({courseId, status:"in_progress", userId})
    const headProgress =  await headProgressObj.save();
    return new HeadProgressModel(headProgress);
  }
}
