import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Services/axios';
import { Api_Paths } from '../Services/apiPath';
import Navbar from '../Components/Navbar';

const formatTime = (time) => {
  if (!time) return "N/A";
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const Doctors = () => {
  const { specialization } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [datetime, setDateTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAppointment = async () => {
    if (!datetime) {
      setError("Please select a date and time");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post(Api_Paths.Appointment.Book_Appointment, {
        doctorId: selectedDoctor.id,
        appointmentDate: datetime
      });
      alert("Appointment booked successfully!");
      setSelectedDoctor(null);
      setDateTime("");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(Api_Paths.Doctor.GetDoctors, {
          params: { specialization }
        });
        setDoctors(res.data);
      } catch (err) {
        setError("Failed to fetch doctors");
      }
    };
    fetchDoctor();
  }, [specialization]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{specialization}</h2>
          <p className="text-gray-500 mt-1">Select a doctor to book an appointment</p>
        </div>

        {error && !selectedDoctor && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col gap-4"
            >
              {/* Doctor Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  🩺
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-blue-600">{doc.specialization}</p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-500">🕐 Available:</span>
                <span className="text-green-600 font-medium">
                  {formatTime(doc.availableFrom)}
                </span>
                <span className="text-gray-400">—</span>
                <span className="text-red-500 font-medium">
                  {formatTime(doc.availableTo)}
                </span>
              </div>

              {/* Book Button */}
              <button
                onClick={() => {
                  setSelectedDoctor(doc);
                  setError("");
                  setDateTime("");
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2 rounded-lg transition duration-200"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {doctors.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🩺</p>
            <p className="text-lg">No doctors found for {specialization}</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                🩺
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {selectedDoctor.name}
                </h3>
                <p className="text-sm text-blue-600">{selectedDoctor.specialization}</p>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-3 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Date Time Picker */}
            <label className="text-sm text-gray-600 mb-1 block font-medium">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAppointment}
                disabled={loading}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  setError("");
                  setDateTime("");
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;