import { ObjectId } from "mongodb";
export default class CourseModel{
    id: string | ObjectId;
    title: string;
    description: string;

    constructor(properties:any){
        this.id = properties.id,
        this.title = properties.title;
        this.description = properties.description;
    }

    // getTitle(){
    //     return this.courseTitle 
    // }
}