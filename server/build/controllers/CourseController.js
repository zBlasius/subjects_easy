"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
const CourseController = {
    createCourse: (user, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = new CourseModel_1.default();
            const createdCourse = yield courseModel.createCourse(user, data);
            return createdCourse;
        }
        catch (error) {
            throw new Error("Erro na criação de usuário");
        }
    }),
    listAllCourseByUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModal = new CourseModel_1.default();
            const listAllCourse = yield courseModal.listAllCourseByUser(user);
            return listAllCourse;
        }
        catch (error) {
            throw error;
        }
    }),
    listCourseById: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = new CourseModel_1.default();
            const course = yield courseModel.listCourseById(data);
            return course;
        }
        catch (error) {
            throw error;
        }
    }),
    saveNewVideo: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            data.VideoLink = "http://localhost:8080/temp/" + data.FileName;
            const courseModel = new CourseModel_1.default();
            const course = yield courseModel.createNewVideo(data);
            return course;
        }
        catch (error) {
            throw error;
        }
    })
};
exports.default = CourseController;
