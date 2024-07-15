import { env } from "node:process";
const getEnv = (key: string): string => (env[key] ? (env[key] as string) : "");
import mongoose, { Connection } from 'mongoose';

const dbUser = getEnv("user_mongodb");
const dbPassword = getEnv("password_mongodb");

export default class MongoAction{
    connection?:Connection;

    constructor(){
        this.connection;
    }

    private async databaseConfigConnection(){
        mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@hosttype.wlnzh.mongodb.net/?retryWrites=true&w=majority&appName=hosttype`);

        this.connection = mongoose.connection;
    
        this.connection.on("error", () =>{
            console.error("Mongodb database connection error")
        })
    
        this.connection.on("open",()=>{
            console.log('Conectado ao mongodb');
        })
    }

    async disconnectDatabase() {
        if (this.connection) {
            mongoose.disconnect();
            console.log('Conexão com o banco de dados MongoDB encerrada');
        }
    };

    async connect(){
        await this.databaseConfigConnection()
    }
}