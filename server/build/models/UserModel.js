"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const collection_structure = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    password: {
        type: String
    }
});
const mongooseUser = mongoose_1.default.model("users", collection_structure);
class UserModel {
    createUser(data) {
        return new Promise((resolve, reject) => {
            mongooseUser.create(data).then(ret => {
                resolve(ret);
            }).catch(err => {
                reject("problemas ao criar o usuário");
            });
        });
    }
    checkAuth(user) {
        return new Promise((resolve, reject) => {
            mongooseUser.findOne({ email: user.email, password: user.password })
                .then(foundUser => {
                if (foundUser) {
                    resolve('usuário encontrado!');
                }
                else {
                    reject("Credenviais inválidas");
                }
            });
        });
    }
}
exports.default = UserModel;
