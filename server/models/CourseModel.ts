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

interface NewCourseData {
    User: {
        type: String
    }
    Name: {
        type: String
    },
    Description: {
        type: String
    },
    StorageUsage: {
        type: Number
    },
    VideoList: [
        {
            Title: String,
            Description: String,
            StorageUsage: Number,
            VideoLink: String
        }]
}

class CourseModel {

    async createCourse(user: Auth, data: NewCourseData) {

        const newCourse = new mongooseCourse({
            User: user.email,
            Name: data.Name,
            Description: data.Description,
            StorageUsage: data.StorageUsage,
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
            console.log('email', user)
            const listCourse = mongooseCourse.find({User: user.email})
            return listCourse

        } catch (error) {
            throw error;
        }
    }
}

export default CourseModel;