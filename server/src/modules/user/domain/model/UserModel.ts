import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class UserModel extends Document{
  id: string | null | undefined| ObjectId;
  fullName: string;
  email: string;
  type: string;
  password: string;

  constructor(properties: { fullName: string; email: string, type: string, password: string, _id: string | ObjectId}) {
    super()
    const { fullName, email, type, password, _id} = properties;
    this.id = _id
    this.fullName = fullName;
    this.email = email;
    this.type = type;
    this.password = password;
  }
}
