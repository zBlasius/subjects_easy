import mongoose, { Connection, Document } from 'mongoose';
import * as data from "../../keys.json"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Outros campos do usuário
});

const dbUser = data["DB_USER"];
const dbPassword = data["DB_PASS"]

let connection: Connection;

const connectDatabase = () => {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@hosttype.wlnzh.mongodb.net/?retryWrites=true&w=majority&appName=hosttype`);

    connection = mongoose.connection;

    connection.on("error", () =>{
        console.error("Mongodb database connection error")
    })

    connection.on("open",()=>{ // Quer dizer sucesso
        console.log('Conectado ao mongodb');
    })
};

const disconnectDatabase = () => {
    if (connection) {
        mongoose.disconnect();
        console.log('Conexão com o banco de dados MongoDB encerrada');
    }
};

connectDatabase();

module.exports = mongoose;