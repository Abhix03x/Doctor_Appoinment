import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';

const Admin = () => {

  const [pending,setpending]=useState([]);
  const [error,setError] = useState("");

  useEffect(() =>{
    fetchPending();
  },[]);
  const fetchPending = async()=>{
    try{
      const res = await axiosInstance.get(Api_Paths.Admin.Get_Appointments);
      setpending(res.data);
    }catch(err){
      setError("failed to fetch pending appointments");
    }
  }
  // console.log(pending.length)
  const Count = pending.filter(
  app => app.status?.toLowerCase() === 'pending'
).length;

const todayCount = pending.filter(app => {
  const d = new Date(app.appointmentDate);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
});
console.log(todayCount)

const confirmedCount = todayCount.filter(
  app => app.status?.toLowerCase() === 'confirmed'
).length;
console.log(confirmedCount)


  return (
    <div>
      <Navbar />
      <div className='pt-3'>
        <div className="bg-blue-100 border border-blue-300 rounded-xl px-6 py-4 mb-6">
  <p className="text-sm text-blue-600 font-medium">Today's Appointments</p>
  <p className="text-3xl font-bold text-blue-700">{todayCount.length}</p>
</div>
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl px-6 py-4 mb-6">
          <p className="text-sm text-yellow-600 font-medium">
            Pending Appointments
          </p>
          <p className="text-3xl font-bold text-yellow-700">{Count}</p>
        </div>
      </div>
    </div>
  );
}

export default Admin
