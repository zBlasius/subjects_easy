import { Document } from 'mongoose';

export class UserModel extends Document{
  id: string | null | undefined;
  fullName: string;
  email: string;
  type: string;
  password: string;

  constructor(properties: { fullName: string; email: string, type: string, password: string, id: string}) {
    super()
    const { fullName, email, type, password, id} = properties;
    this.id = id
    this.fullName = fullName;
    this.email = email;
    this.type = type;
    this.password = password;
  }
}
