import { useState } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"; 
import './App.css'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Doctors from './Pages/Doctors';
import Admin from './Pages/Admin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/doctors/:specialization' element={<Doctors/>}/>
          <Route path='/admin-dashboard' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () =>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (<Navigate to="/dashboard"/>):(<Navigate to="/login"/>);
};

export default App;
