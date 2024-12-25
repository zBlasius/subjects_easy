import mongoose, { Schema, Document } from "mongoose";

export interface ICouse extends Document {
  userId: string;
  title: string;
  description: string;
  nameSearch: string;
  codeSearch: number;
}

const CourseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  nameSearch: { type: String, required: true },
  codeSearch: { type: Number, required: true }
});

const Course = mongoose.model<ICouse>("Course", CourseSchema);
export default Course;
