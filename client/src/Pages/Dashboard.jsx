import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';
import Navbar from '../Components/Navbar';

const specializationIcon = (spec) => {
  const icons = {
    Cardiologist: "❤️",
    Pediatrician: "👶",
    Neurologist: "🧠",
    Dermatologist: "🧴",
    Orthopedic: "🦴",
    Dentist: "🦷",
    Psychiatrist: "🧘",
    Ophthalmologist: "👁️",
  };
  return icons[spec] || "🩺";
};

const Dashboard = () => {
  const [specialization, setSpecialization] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(Api_Paths.Doctor.GetSpecialization)
      .then((res) => setSpecialization(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Find a Doctor</h2>
          <p className="text-gray-500 mt-1">Select a specialization to book an appointment</p>
        </div>

        {/* Specialization Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialization.map((spec, index) => (
            <div
              key={index}
              onClick={() => navigate(`/doctors/${spec}`)}
              className="bg-white rounded-xl shadow hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer p-6 flex flex-col items-center gap-3"
            >
              <span className="text-4xl">{specializationIcon(spec)}</span>
              <p className="text-sm font-semibold text-gray-700 text-center">{spec}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;