import mongoose from "mongoose"

const Schema = mongoose.Schema;

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
})

const mongooseUser = mongoose.model("USER", collection_structure)

interface UserBasicInfo {
    name: string,
    email: string,
    age: number,
    password: string
}

class UserModel {

    createUser(data: UserBasicInfo) {
        return new Promise((resolve, reject) => {
            mongooseUser.create(data).then(ret => {
                resolve(ret)
            }).catch(err => {
                reject("problemas ao criar o usuário")
            })
        })
    }
}

export default UserModel;