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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
        }
    ]
});
const mongooseCourse = mongoose_1.default.model("course", collection_structure);
class CourseModel {
    createCourse(user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = new mongooseCourse({
                User: user.email,
                Name: data.Name,
                Description: data.Description,
                StorageUsage: 0,
                VideoList: []
            });
            try {
                const ret = yield newCourse.save();
                return ret;
            }
            catch (error) {
                throw error;
            }
        });
    }
    listAllCourseByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listCourse = mongooseCourse.find({ User: user.email });
                return listCourse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    listCourseById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listCourse = mongooseCourse.find({ _id: data.id });
                return listCourse;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createNewVideo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new mongoose_1.default.Types.ObjectId(data.courseId);
            mongooseCourse.updateOne({ _id: id }, {
                $push: {
                    VideoList: data
                }
            }).then(ret => {
                return ret;
            }).catch(err => {
                throw new Error(err);
            });
        });
    }
}
exports.default = CourseModel;
