import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  courseId: string;
  title: string;
  description: string;
  buckerUrl: string;
}

const FileSchema: Schema = new Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buckerUrl: { type: String, required: true },
});

const File = mongoose.model<IFile>("File", FileSchema);
export default File;