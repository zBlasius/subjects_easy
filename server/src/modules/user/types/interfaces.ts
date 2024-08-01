export interface LoginInfo{
    email:string,
    password:string
}

export interface RegisterInfo{
    fullName:string;
    email:string;
    type: "Student" | "Teacher";
    password: string
}

export interface RegisterUserDb{
    fullName: string;
    email: string;
    password: string;
    type: "Student" | "Teacher"
}