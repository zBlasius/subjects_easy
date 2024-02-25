import React from 'react';
import './App.css';
import Login from './pages/Login';
import MyButton from './components/Button';


function App() {
  return (
    <div className="App">
      <Login/>
      <MyButton label="opa"/>
    </div>
  );
}

export default App;
