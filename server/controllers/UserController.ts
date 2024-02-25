import UserModel from "../models/UserModel";

interface UserAuth {
    email:string
}

interface UserBasicInfo {
    name:string,
    email:string,
    age:number,
    password:string
}

const UserController = {
    createUser: async (user:UserAuth, data:UserBasicInfo)=>{
        try {
            const userModel = new UserModel();
            const clients = await userModel.createUser(data)
            return clients
        } catch (error) {
            throw new Error("Erro na criação de usuário");
        }
    }
}

export default UserController;