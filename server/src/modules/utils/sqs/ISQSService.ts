export interface SQSMessageParams {
  s3Key: string;
  bucketName: string;
  mimeType: string;
  fileUrl: string;
}

export interface ISQSService {
  sendMessage(params: SQSMessageParams): Promise<string>;
  deleteMessage(receiptHandle: string): Promise<void>;
}
