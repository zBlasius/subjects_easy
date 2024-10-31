import { ObjectId } from 'mongodb';

export class UserInfoDTO{
    userId: string | ObjectId;
    fullName: string;
    email: string;
    type: string;

  
    constructor(properties: { fullName: string; email: string, type: string, userId: string | ObjectId}) {
      const { fullName, email, type, userId} = properties;
      this.userId = userId
      this.fullName = fullName;
      this.email = email;
      this.type = type;
    }
}