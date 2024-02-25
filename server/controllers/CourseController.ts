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

            console.log('user', user)
            console.log('data', data)

            const courseModel = new CourseModel();
            const createdCourse = await courseModel.createCourse(user, data)
            console.log('createdCourse', createdCourse)
            return createdCourse
        } catch (error) {
            console.log('error', error)
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
    }
}

export default CourseController;