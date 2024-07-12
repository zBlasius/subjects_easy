import mongoose, {Schema, Document} from "mongoose";

export interface ICouse extends Document{
    id:number;
    courseTitle: string
}

const CourseSchema: Schema = new Schema({
    id: { type: Number, required: true },
    courseTitle: { type: String, required: true },
  });

const Course = mongoose.model<ICouse>("Course", CourseSchema)

class Database {

    constructor() {
    }

    course(){
        return Course
    }
}

export default Database