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


function App() {

  const [state, setState] = useState({...data})

  const routes = useRoutes([
    {
      path: "/",
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
      path: "/course-list",
      element: <CourseList/>
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
        setUserInfo: (n:any)=> updateState("userInfo", n)
      }}> 
      {routes}
      </DataContext.Provider>
    </div>
  );
}

export default App;
