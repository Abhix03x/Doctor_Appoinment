import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';
import Navbar from '../Components/Navbar';

const Dashboard = () => {

  const [specialization,setSpecialization] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    axiosInstance.get(Api_Paths.Doctor.GetSpecialization)
    .then((res => setSpecialization(res.data)))
    .catch(() => alert("Unauthorized"));
  },[]);
  console.log(specialization);

  return (
    <div>
      <Navbar/>
      <h2>Specializations</h2>
      {specialization.map((spec,index) =>(
        <div key={index}>
          <p onClick={() => navigate(`/doctors/${spec}`)}>{spec}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
