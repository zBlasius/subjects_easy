
import mongoose, { Connection, Document } from 'mongoose';

// Defina o esquema (schema) que será usado no banco de dados
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Outros campos do usuário
});


let connection: Connection;

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase');

        connection = mongoose.connection;
        console.log('Conexão com o banco de dados MongoDB estabelecida');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    }
};

const disconnectDatabase = async () => {
    if (connection) {
        await mongoose.disconnect();
        console.log('Conexão com o banco de dados MongoDB encerrada');
    }
};

const UserModel = mongoose.model<User>('User', userSchema);

// Função para listar usuários com opções de filtro
const listUsers = async (filter: Partial<User>): Promise<User[]> => {
    try {
        return await UserModel.find(filter).lean();
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return [];
    }
};

// Função para criar um novo usuário
const createUser = async (userData: Partial<User>): Promise<User | undefined> => {
    try {
        const user = await UserModel.create(userData);
        return user.toObject();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return undefined;
    }
};

// Função para editar um usuário por ID
const editUser = async (userId: string, updatedData: Partial<User>): Promise<User | undefined> => {
    try {
        const user = await UserModel.findByIdAndUpdate(userId, updatedData, { new: true }).lean();
        return;
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        return undefined;
    }
};

// Função para remover um usuário por ID
 const deleteUser = async (userId: string): Promise<boolean> => {
    try {
        const result = await UserModel.findByIdAndDelete(userId);
        return !!result;
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return false;
    }
};

// Defina a interface para o modelo de usuário
interface User {
    name: string;
    email: string;
    // Outros campos do usuário
}

class Database {
    user: User;

    constructor(user: User) {
        this.user = user
    }

    // Função para listar usuários com opções de filtro
    async list(collection: string) {
        try {
            return `list ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para criar um novo usuário
    async create(collection: string) {
        try {
            return `create ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para editar um usuário por ID
    async edit(collection: string, id:number, data:object){
        try {
            return `edit ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };

    // Função para remover um usuário por ID
    async delete(collection: string, id:number){
        try {
            return `delete ${collection}`
        } catch (error) {
            console.error('Erro ao listar :', error);
            return [];
        }
    };
}

export default Database