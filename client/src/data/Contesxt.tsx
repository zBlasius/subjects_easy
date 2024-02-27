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
        Description: "Teste",
        Name:"Teste",
        StorageUsage:"000",
        User: "user@gmail.com",
        ImageTemplateLink: "",
        _id:"123",
        VideoList: [{
          Description : "Descrição vídeo 01",
          StorageUsage: 0,
          Title: "Título video 01",
          VideoLink: "teste.com",
        }]
      }
    ],
    user:"teste",
    setUserInfo: (n:any)=>{},
    setCourseList: (n:any)=>{},
    setUser: (n:any) =>{}
}

const DataContext = React.createContext(data);

export default DataContext;