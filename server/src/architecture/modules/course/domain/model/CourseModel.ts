
export default class CourseModel{
    id: number;
    courseTitle: string;

    constructor(properties:any){
        this.id = properties.id,
        this.courseTitle = properties.courseTitle;
    }

    getTitle(){
        return this.courseTitle
    }
}