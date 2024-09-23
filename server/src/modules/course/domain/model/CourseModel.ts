import { ObjectId } from "mongodb";
import FileModel from "./FileModel";
import { CourseDTO } from "../dto";
export default class CourseModel {
  id: string | ObjectId | unknown;
  title: string;
  description: string;
  userId: string | ObjectId;
  videoList: FileModel[] | undefined;

  constructor(properties: {
    _id: ObjectId | string | unknown; 
    title: string;
    description: string;
    userId: string | ObjectId;
    videoList?: FileModel[];
  }) {
    this.id = properties._id; 
    this.title = properties.title;
    this.description = properties.description;
    this.userId = properties.userId;
    this.videoList = properties.videoList;
  }

  toCourseDetail(){
    return CourseDTO({
      id: this.id,
      title: this.title,
      description: this.description,
      userId: this.userId,
      videoList: this.videoList
    })
  }
}
