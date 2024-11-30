import { ObjectId } from 'mongodb';
import { UserInfoDTO } from '../dto/UserInfoDTO';

export class UserModel {
  userId: string | ObjectId;
  fullName: string;
  email: string;
  type: string;
  password: string; 

  constructor(properties: { fullName: string; email: string, type: string, password: string, _id: string | ObjectId}) {
    const { fullName, email, type, password, _id} = properties;
    this.userId = _id
    this.fullName = fullName;
    this.email = email;
    this.type = type;
    this.password = password;   
  }

  toBasicInfo(){
    return new UserInfoDTO({
      userId: this.userId,
      fullName: this.fullName,
      email: this.email,
      type: this.type
    })
  }
}
