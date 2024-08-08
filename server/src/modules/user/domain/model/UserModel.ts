import { Document } from 'mongoose';

export class UserModel extends Document{
  fullName: string;
  email: string;
  type: string;
  password: string;

  constructor(properties: { fullName: string; email: string, type: string, password: string}) {
    super()
    const { fullName, email, type, password} = properties;
    this.fullName = fullName;
    this.email = email;
    this.type = type;
    this.password = password;
  }
}
