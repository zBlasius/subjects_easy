import { IProgressService } from "./contracts";
import { inject, injectable } from "inversify";
import { TYPES } from "../../utils/TYPES";
import { IHeadProgressRepository } from "../../architeture";

@injectable()
export class ProgressService implements IProgressService {

  constructor(
    @inject(TYPES.HeadProgressRepository)
    private headProgressRepository: IHeadProgressRepository
  ) {
  }

  // TODO - Write tests here
  async getHeadProgressByCourseId(courseId: string) {
    return this.headProgressRepository.findByCourseId(courseId)
  }

  // TODO - Write tests here
  async createHeadProgress(courseId: string, userId: string) {
    return this.headProgressRepository.createHeadProgress(courseId, userId);
  }

  // TODO - Write tests here
  async getHeadProgressByUserId(userId: string){
    return this.headProgressRepository.listByUserId(userId);
  }
}

