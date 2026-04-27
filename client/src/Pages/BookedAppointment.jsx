import React, { useEffect, useState } from 'react';
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';
import Navbar from '../Components/Navbar';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':   return 'bg-yellow-100 text-yellow-700';
    case 'confirmed': return 'bg-green-100 text-green-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    case 'completed': return 'bg-blue-100 text-blue-700';
    default:          return 'bg-gray-100 text-gray-700';
  }
};

const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const BookedAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get(Api_Paths.Appointment.Get_Patient_Appointments);
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to fetch appointments");
    }
  };

  const todayAppointments = appointments.filter(app => isToday(app.appointmentDate));
  const otherAppointments = appointments.filter(app => !isToday(app.appointmentDate));

  const AppointmentCard = ({ app }) => (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
          🩺
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{app.doctorName}</h3>
          <p className="text-sm text-blue-600">{app.specialization}</p>
          <p className="text-sm text-gray-500 mt-1">
            📅 {formatDate(app.appointmentDate)}
          </p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(app.status)}`}>
        {app.status}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Appointments</h2>
          <p className="text-gray-500 mt-1">Track your upcoming and past appointments</p>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {appointments.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-lg">No appointments found</p>
          </div>
        ) : (
          <>
            {/* Today's Appointments */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-gray-800">Today</h3>
                {todayAppointments.length > 0 && (
                  <span className="bg-blue-700 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {todayAppointments.length}
                  </span>
                )}
              </div>

              {todayAppointments.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3 text-gray-400">
                  <span className="text-2xl">📅</span>
                  <p className="text-sm">No appointments today</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {todayAppointments.map(app => (
                    <AppointmentCard key={app.id} app={app} />
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming / Past Appointments */}
            {otherAppointments.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  All Appointments
                </h3>
                <div className="flex flex-col gap-3">
                  {otherAppointments.map(app => (
                    <AppointmentCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookedAppointment;