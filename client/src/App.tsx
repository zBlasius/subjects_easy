import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useRoutes
} from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import CourseList from './pages/CourseList';
import DataContext, {data} from './data/Contesxt';
import NewCourse from './pages/NewCourse';
import CourseDetails from './pages/CourseDetails';
import NewVideo from './pages/NewVideo';
import Register from './pages/Register';


function App() {

  const [state, setState] = useState({...data})

  const routes = useRoutes([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/admin",
      children: [
        {path:"", element: <></>},
        {path:"manage/user/:userId", element:<></>}
      ]
    },
    {
      path: "/new-course",
      element: <NewCourse/>
    },
    {
      path: "/course-list",
      element: <CourseList/>
    },
    {
      path: "/course-details/:courseId",
      element: <CourseDetails/>
    },
    {
      path:"/new-video/:courseId",
      element: <NewVideo/>
    },
    {
      path:"/register",
      element: <Register/>
    }
  ])

  function updateState(key:string, value:string) {
    setState((prevState:any) => ({
      ...prevState,
      [key]: value
    }));
  }
  
  return (
    <div className="App">
      <DataContext.Provider value={{
        ...state,
        setUserInfo: (n:any)=> updateState("userInfo", n),
        setCourseList: (n:any)=> updateState("courseList", n),
        setUser: (n:any)=> updateState("user", n)
      }}> 
      {routes}
      </DataContext.Provider>
    </div>
  );
}

export default App;
