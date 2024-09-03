import mongoose, { Schema, Document } from "mongoose";

export interface ICouse extends Document {
  userId: string;
  title: string;
  description: string;
}

const CourseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Course = mongoose.model<ICouse>("Course", CourseSchema);
export default Course;