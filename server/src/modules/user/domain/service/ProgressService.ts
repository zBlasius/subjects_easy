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

  async getHeadProgressByCourseId(courseId: string) {
    return this.headProgressRepository.findByCourseId(courseId)
  }

  async createHeadProgress(courseId: string, userId: string) {
    return this.headProgressRepository.createHeadProgress(courseId, userId);
  }

  async getHeadProgressByUserId(userId: string){
    return this.headProgressRepository.listByUserId(userId);
  }
}

