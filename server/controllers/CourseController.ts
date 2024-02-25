import CourseModel from "../models/CourseModel"

interface UserAuth {
    email: string,
}

interface NewCourseData {
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
}

const CourseController = {
    createCourse: async (user: UserAuth, data: NewCourseData) => {
        try {

            const courseModel = new CourseModel();
            const createdCourse = await courseModel.createCourse(user, data)
            return createdCourse
        } catch (error) {
            throw new Error("Erro na criação de usuário");
        }
    },

    listAllCourseByUser: async (user: UserAuth) => {
        try {
            const courseModal = new CourseModel();
            const listAllCourse = await courseModal.listAllCourseByUser(user)
            return listAllCourse;

        } catch (error) {
            throw error;
        }
    },

    listCourseById: async (data:{id:string})=>{
        try {
            const courseModel = new CourseModel();
            const course = await courseModel.listCourseById(data);
            return course;
        } catch (error) {
            throw error;
        }
    }
}

export default CourseController;