import React from "react";

type UserInfo = {
  // Defina os campos de UserInfo conforme necessário
  email: string;
  userId: string;
  type: string;
  fullName: string;
};

export const data = {
  number: 123,
  text: "Título principal",
  courseList: [
    {
      id: "",
      title: "",
      description: "",
    },
  ],
  user: "",
  userInfo: {
    userId: "",
    email: "",
    type: "",
    fullName: "",
  },
  setUserInfo: (n: UserInfo) => {},
  setCourseList: (n: any) => {},
  setUser: (n: any) => {},
};

const DataContext = React.createContext(data);

export default DataContext;
