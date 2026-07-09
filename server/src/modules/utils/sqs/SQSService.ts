import AWS from "aws-sdk";
import { injectable } from "inversify";
import { ISQSService, SQSMessageParams } from "./ISQSService";

const sqs = new AWS.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@injectable()
export class SQSService implements ISQSService {
  private queueUrl: string;

  constructor() {
    this.queueUrl = process.env.AWS_SQS_QUEUE_URL || "";
  }

  async sendMessage(params: SQSMessageParams): Promise<string> {
    try {
      const result = await sqs
        .sendMessage({
          QueueUrl: this.queueUrl,
          MessageBody: JSON.stringify(params),
          MessageAttributes: {
            mimeType: {
              DataType: "String",
              StringValue: params.mimeType,
            },
          },
        })
        .promise();

      if (!result.MessageId) {
        throw new Error("Failed to send SQS message");
      }

      return result.MessageId;
    } catch (error) {
      console.error("Error sending SQS message:", error);
      throw new Error("Failed to send SQS message"); 
    }
  }

  async deleteMessage(receiptHandle: string): Promise<void> {
    await sqs
      .deleteMessage({
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle,
      })
      .promise();
  }
}
