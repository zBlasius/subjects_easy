import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Database from "../../../../../database/mongodb/database"
import { injectable } from "inversify";
const db = new Database();

@injectable()
export class UserRepository{
    constructor(){}

    private register(){
        return
    }
}