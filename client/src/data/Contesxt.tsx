import React from "react";

type UserInfo = {
    // Defina os campos de UserInfo conforme necessário
    name: string;
    email: string;
  };

export const data = {
    number: 123,
    text:'Título principal',
    courseList:[
     {
      id:"",
      title:"",
      description:""
     }
    ],
    user:"",
    setUserInfo: (n:any)=>{},
    setCourseList: (n:any)=>{},
    setUser: (n:any) =>{}
}

const DataContext = React.createContext(data);

export default DataContext;