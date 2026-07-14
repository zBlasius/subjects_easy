import { injectable } from "inversify";
import { ObjectId } from "mongodb";
import Job from "../../../database/mongodb/Job";
import JobModel, { JobName, JobStatus } from "./JobModel";
import { IJobRepository } from "./IJobRepository";

@injectable()
export class JobRepository implements IJobRepository {
  async create(params: {
    referenceId: string | ObjectId;
    content: unknown;
    name: JobName;
  }): Promise<JobModel> {
    const job = await Job.create({
      referenceId: params.referenceId,
      content: params.content,
      name: params.name,
      status: "CREATED" as JobStatus,
    });
    return new JobModel(job);
  }

  async updateStatus(jobId: string | ObjectId, status: JobStatus): Promise<JobModel> {
    const job = await Job.findByIdAndUpdate(jobId, { status }, { new: true });
    if (!job) throw new Error(`Job ${jobId} not found`);
    return new JobModel(job);
  }

  async registerError(params: {
    jobId: string | ObjectId;
    error_message: string;
    error_content?: unknown;
  }): Promise<JobModel> {
    const job = await Job.findByIdAndUpdate(
      params.jobId,
      {
        status: "FAILED" as JobStatus,
        error_message: params.error_message,
        error_content: params.error_content,
        $inc: { attempts: 1 },
      },
      { new: true }
    );
    if (!job) throw new Error(`Job ${params.jobId} not found`);
    return new JobModel(job);
  }
}
