import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  courseId: string;
  title: string;
  description: string;
  s3Key: string;
  userFileName: string;
  bucketUrl: string;
}

const FileSchema: Schema = new Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  s3Key: { type: String, required: true },
  userFileName: { type: String, required: true },
  bucketUrl: { type: String, required: true },
});

const File = mongoose.model<IFile>("File", FileSchema);
export default File;