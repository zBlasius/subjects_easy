import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";
import JobModel, { JobName, JobStatus } from "./JobModel";
import { IJobService } from "./IJobService";
import { IJobRepository } from "./IJobRepository";
import { JOB_TYPES } from "./TYPES";

@injectable()
export class JobService implements IJobService {
  constructor(
    @inject(JOB_TYPES.JobRepository)
    private jobRepository: IJobRepository
  ) {}

  async create(params: {
    referenceId: string | ObjectId;
    content: unknown;
    name: JobName;
  }): Promise<JobModel> {
    return this.jobRepository.create(params);
  }

  async updateStatus(jobId: string | ObjectId, status: JobStatus): Promise<JobModel> {
    return this.jobRepository.updateStatus(jobId, status);
  }

  async registerError(params: {
    jobId: string | ObjectId;
    error_message: string;
    error_content?: unknown;
  }): Promise<JobModel> {
    return this.jobRepository.registerError(params);
  }
}
