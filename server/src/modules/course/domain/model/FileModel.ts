import { ObjectId } from "mongodb";

export default class FileModel{
    id: string | ObjectId;
    courseId: string;
    title: string;
    description: string;
    bucketUrl: string;

    constructor(properties:any){
        this.id = properties.id;
        this.courseId = properties.courseId;
        this.title = properties.title;
        this.description = properties.description;
        this.bucketUrl = properties.bucketUrl;
    }
}