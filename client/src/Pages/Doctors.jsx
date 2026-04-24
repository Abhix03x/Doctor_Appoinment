import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';

const Doctors = () => {
  const {specialization} = useParams();
  const [doctor,setDoctors] = useState([]);
  const [datetime,setDateTime] = useState("");
  const [selectedDoctor,setSelectedDoctor] = useState(null);
  const [error,setError] = useState("");
  // console.log(specialization);

  const handleAppointment = async () =>{
    try{
       await axiosInstance.post(Api_Paths.Appointment.Book_Appointment,{
        doctorId:selectedDoctor.id,
        appointmentDate:datetime
      });
      
      alert("Booked");
      setSelectedDoctor(null);
      setDateTime("");

    }catch(err){
      console.log(err.response)
      setError(err.response?.data || "something went wrong");

      alert(error)
    }
  }

  useEffect(()=>{
    const fetchDoctor = async ()=>{
      try{
        const res = await axiosInstance.get(Api_Paths.Doctor.GetDoctors,{
          params:{specialization}
        });
        setDoctors(res.data);
      }catch(err){
        console.log(err);
        setError("Failed to fetch Doctors");
      }
    }
    fetchDoctor();
  },[specialization])
  
  return (
    <div>
      <h2>Doctors</h2>
      <div>
        {doctor.map(doc => (
          <div key={doc.id}>
            <p>{doc.name}</p>

           
            <button onClick={() => setSelectedDoctor(doc)}>Book Appointment</button>
          </div>
        ))}
        {selectedDoctor && (
          <div>
            <h3>Booking for Dr. {selectedDoctor.name}</h3>
             <input 
              type='datetime-local'
              value={datetime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <button onClick={handleAppointment}>Confirm</button>
            <button onClick={() => setSelectedDoctor(null)}>cancel</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors
