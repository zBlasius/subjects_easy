export interface LoginInfo{
    username:string,
    password:string
}

export interface RegisterInfo{
    username:string;
    email:string;
    name: string;
    type: "STUDENT" | "TEACHER";
    password: string
}

export interface RegisterUserDb{
    username: string;
    email: string;
    password: string
}