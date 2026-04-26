import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import { Api_Paths } from '../../Services/apiPath';
import axiosInstance from '../../Services/axios';

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

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState(null); // track which row is loading

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get(Api_Paths.Admin.Get_Appointments);
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to fetch appointments");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoadingId(id);
    try {
      await axiosInstance.put(
        Api_Paths.Admin.Status(id),
        { status: newStatus }
      );
      // update status in UI without refetching
      setAppointments(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    setLoadingId(id);
    try {
      await axiosInstance.delete(Api_Paths.Admin.Delete(id));
      // remove from UI instantly
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      setError("Failed to delete appointment");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Change Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((app, index) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.patientName}
                    </td>

                    <td className="px-6 py-4 text-gray-700">{app.doctorName}</td>

                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(app.appointmentDate)}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Status change dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        disabled={loadingId === app.id}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {/* Delete button */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={loadingId === app.id}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-200 disabled:opacity-50"
                      >
                        {loadingId === app.id ? "..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointment;