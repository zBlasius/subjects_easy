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
const database_1 = __importDefault(require("../database/mongodb/database"));
const db = new database_1.default({
    name: "Gustavo",
    email: "gustavo.blasius@gmail.com"
});
const Client = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db.list("Client");
            return result;
        }
        catch (error) {
            throw error;
        }
    }),
    create: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db.create("Client");
            return result;
        }
        catch (error) {
            throw error;
        }
    }),
    edit: (clientId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db.edit("Client", clientId, updatedData);
            return result;
        }
        catch (error) {
            throw error;
        }
    }),
    delete: (clientId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield db.delete("Client", clientId);
            return result;
        }
        catch (error) {
            throw error;
        }
    })
};
exports.default = Client;
