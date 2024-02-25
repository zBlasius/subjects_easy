import UserModel from "../models/UserModel";

interface UserAuth {
    email: string,
    password: string
}

interface UserBasicInfo {
    name: string,
    email: string,
    age: number,
    password: string
}

const UserController = {
    createUser: async (user: UserAuth, data: UserBasicInfo) => {
        try {
            const userModel = new UserModel();
            const clients = await userModel.createUser(data)
            return clients
        } catch (error) {
            throw new Error("Erro na criação de usuário");
        }
    },

    login: async (user: UserAuth) => {
        try {
            const userModel = new UserModel();
            const auth = await userModel.checkAuth(user)
            return auth;
        } catch (error) {
            throw new Error("invalid")
        }
    }
}

export default UserController;