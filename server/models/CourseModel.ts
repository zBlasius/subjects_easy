import mongoose from "mongoose"

const Schema = mongoose.Schema;

const collection_structure = new Schema({
    User: {
        type: String
    },
    Name: {
        type: String
    },
    Description: {
        type: String
    },
    StorageUsage: {
        type: Number
    },
    ImageTemplateLink: {
        type: String,
    },
    VideoList: [
        {
            Title: String,
            Description: String,
            StorageUsage: Number,
            VideoLink: String
        }]
})

const mongooseCourse = mongoose.model("course", collection_structure)

interface Auth {
    email: string
}

interface NewVideo {
    courseId: string,
    Title: string,
    Description: string,
    StorageUsage: number,
    VideoLink: string
}

interface NewCourseData {
    User: string
    Name: string
    Description: string
    StorageUsage: number
    FileName: string
    VideoList: [
        {
            Title: string,
            Description: string,
            StorageUsage: number,
            VideoLink: string
        }]
}

class CourseModel {

    async createCourse(user: Auth, data: NewCourseData) {

        const newCourse = new mongooseCourse({
            User: user.email,
            Name: data.Name,
            Description: data.Description,
            StorageUsage: 0,
            ImageTemplateLink:`http://localhost:8080/temp/` + data.FileName,
            VideoList: []
        })

        try {
            const ret = await newCourse.save();
            return ret;
        } catch (error) {
            throw error;
        }
    }

    async listAllCourseByUser(user: Auth) {
        try {
            const listCourse = mongooseCourse.find({User: user.email})
            return listCourse

        } catch (error) {
            throw error;
        }
    }

    async listCourseById(data:{id:string}){
        try {
            const listCourse = mongooseCourse.find({_id:data.id})
            return listCourse
        } catch (error) {
            throw error;
        }
    }

    async createNewVideo(data: NewVideo){
        const id = new mongoose.Types.ObjectId(data.courseId)
        mongooseCourse.updateOne(
            { _id:  id},
            {
              $push: {
                VideoList: data
              }
            }).then(ret=>{
                return ret
            }).catch(err=>{
                throw new Error(err)
            })
    }
}

export default CourseModel;