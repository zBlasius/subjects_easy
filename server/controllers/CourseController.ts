import CourseModel from "../models/CourseModel"

interface UserAuth {
    email: string,
}

interface NewCourseData {
    User: string,
    Name: string,
    Description: string,
    StorageUsage: number,
    FileName: string,
    VideoList: [
        {
            Title: string,
            Description: string,
            StorageUsage: number,
            VideoLink: string
        }]
}

interface NewVideo {
    Title: string,
    Description: string,
    StorageUsage: number,
    VideoLink: string,
    FileName: string,
    courseId:string
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

    listCourseById: async (data: { id: string }) => {
        try {
            const courseModel = new CourseModel();
            const course = await courseModel.listCourseById(data);
            return course;
        } catch (error) {
            throw error;
        }
    },

    saveNewVideo: async (data:NewVideo) => {
        try {
            data.VideoLink = "http://localhost:8080/temp/" + data.FileName
            const courseModel = new CourseModel();
            const course = await courseModel.createNewVideo(data);
            return course
        } catch (error) {
            throw error;
        }
    }
}

export default CourseController;