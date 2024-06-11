"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const data = __importStar(require("../../keys.json"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Outros campos do usuário
});
const dbUser = data["DB_USER"];
const dbPassword = data["DB_PASS"];
let connection;
const connectDatabase = () => {
    mongoose_1.default.connect(`mongodb+srv://${dbUser}:${dbPassword}@hosttype.wlnzh.mongodb.net/?retryWrites=true&w=majority&appName=hosttype`);
    connection = mongoose_1.default.connection;
    connection.on("error", () => {
        console.error("Mongodb database connection error");
    });
    connection.on("open", () => {
        console.log('Conectado ao mongodb');
    });
};
const disconnectDatabase = () => {
    if (connection) {
        mongoose_1.default.disconnect();
        console.log('Conexão com o banco de dados MongoDB encerrada');
    }
};
connectDatabase();
module.exports = mongoose_1.default;
