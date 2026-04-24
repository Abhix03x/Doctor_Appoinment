import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Api_Paths } from '../Services/apiPath.js';
import axiosInstance from '../Services/axios.js';

const Login = () => {

  const [email ,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [error,setError]=useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!email){
      setError("Enter a valid Email");
      return;
    }
    if(!password){
      setError("Enter Password");
      return;
    }
    setError(" ");

    try{
      const response = await axiosInstance.post(Api_Paths.Auth.Login,{
        email,
        password
      });
      // console.log("response",response.data);
      const token = response.data;
      // console.log("token",token);


      if(token){
        localStorage.setItem("token",token);
        navigate("/dashboard");
      }
    }catch(error){
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <input placeholder='Password' value={password} type='password' onChange={(e) =>setPassword(e.target.value)}/>
      {error&&<p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;
