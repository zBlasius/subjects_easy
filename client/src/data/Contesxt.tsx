import React from "react";

type UserInfo = {
  email: string;
  userId: string;
  type: string;
  fullName: string;
};

export const THEMES = {
  dark:  { label: "Dark",  bg: "#1b1b1b", color: "#f5f5f5" },
  light: { label: "Light", bg: "#DDDDDD", color: "#1b1b1b" },
} as const;

export type ThemeKey = keyof typeof THEMES;

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
  theme: "dark" as ThemeKey,
  setUserInfo: (n: UserInfo) => {},
  setCourseList: (n: any) => {},
  setUser: (n: any) => {},
  setTheme: (n: ThemeKey) => {},
};

const DataContext = React.createContext(data);

export default DataContext;
