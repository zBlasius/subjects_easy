import { ObjectId } from "mongodb";

export type JobStatus = "CREATED" | "QUEUED" | "PROCESSING" | "DONE" | "FAILED";
export type JobName = "video_processing" | "sqs_general_queue" | "error_register";

export default class JobModel {
  id: string | ObjectId;
  referenceId: string | ObjectId;
  content: unknown;
  status: JobStatus;
  name: JobName;
  attempts: number;
  error_message?: string;
  error_content?: unknown;

  constructor(properties: any) {
    this.id = properties._id;
    this.referenceId = properties.referenceId;
    this.content = properties.content;
    this.status = properties.status;
    this.name = properties.name;
    this.attempts = properties.attempts;
    this.error_message = properties.error_message;
    this.error_content = properties.error_content;
  }
}
