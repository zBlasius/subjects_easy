import { ObjectId } from "mongodb";
import FileModel from "./FileModel";

export class CourseModel {
  id: string | ObjectId | unknown;
  title: string;
  description: string;
  codeSearch: number;
  userId: string | ObjectId;
  videoList: FileModel[] | undefined;

  constructor(properties: {
    _id: ObjectId | string | unknown; 
    title: string;
    description: string;
    userId: string | ObjectId;
    codeSearch: number;
    videoList?: FileModel[];
  }) {
    this.id = properties._id; 
    this.title = properties.title;
    this.description = properties.description;
    this.userId = properties.userId;
    this.videoList = properties.videoList;
    this.codeSearch = properties.codeSearch;
  }
}
