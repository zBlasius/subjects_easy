import { ObjectId } from "mongodb";
import JobModel, { JobName, JobStatus } from "./JobModel";

export interface IJobRepository {
  create(params: {
    referenceId: string | ObjectId;
    content: unknown;
    name: JobName;
  }): Promise<JobModel>;

  updateStatus(jobId: string | ObjectId, status: JobStatus): Promise<JobModel>;

  registerError(params: {
    jobId: string | ObjectId;
    error_message: string;
    error_content?: unknown;
  }): Promise<JobModel>;
}
