import { ObjectId } from "mongodb";

export default class FileModel{
    id: string | ObjectId;
    courseId: string;
    title: string;
    description: string;
    s3Key: string;
    userFileName: string;
    bucketUrl: string;

    constructor(properties:any){
        this.id = properties.id;
        this.courseId = properties.courseId;
        this.title = properties.title;
        this.description = properties.description;
        this.s3Key = properties.s3Key;
        this.userFileName = properties.userFileName;
        this.bucketUrl = properties.bucketUrl;
    }
}