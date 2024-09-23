import FileModel from "../model/FileModel";

export class CourseDetailsDTO {
    id: number;
    title: string;
    description: string;
    videoList: FileModel[]
  
    constructor(properties: { id: number; title: string, description:string, videoList: FileModel[] }) {
      this.id = properties.id;
      this.title = properties.title;
      this.description = properties.description;
      this.videoList = properties.videoList;
    }
  }
  