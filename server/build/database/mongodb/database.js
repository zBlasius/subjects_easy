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
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor(user) {
        this.user = user;
    }
    list(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return [
                    { name: "Gustavo Blasius", age: 30 },
                    { name: "Maria joaquina", age: 20 },
                    { name: "Cirilo", age: 12 }
                ];
            }
            catch (error) {
                console.error('Erro ao listar :', error);
                return [];
            }
        });
    }
    ;
    create(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return `create ${collection}`;
            }
            catch (error) {
                console.error('Erro ao listar :', error);
                return [];
            }
        });
    }
    ;
    edit(collection, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return `edit ${collection}`;
            }
            catch (error) {
                console.error('Erro ao listar :', error);
                return [];
            }
        });
    }
    ;
    delete(collection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return `delete ${collection}`;
            }
            catch (error) {
                console.error('Erro ao listar :', error);
                return [];
            }
        });
    }
    ;
}
exports.default = Database;
