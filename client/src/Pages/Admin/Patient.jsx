import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axiosInstance from '../../Services/axios';
import { Api_Paths } from '../../Services/apiPath';

const Patient = () => {
    const [patient, setPatient] = useState([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState(null); // track which row is loading

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axiosInstance.get(Api_Paths.Admin.Get_patient);
      setPatient(res.data);
    } catch (err) {
      setError("Failed to fetch patient");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Doctor?")) return;
    setLoadingId(id);
    try {
      await axiosInstance.delete(Api_Paths.Admin.Delete_doctor(id));
      // remove from UI instantly
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      setError("Failed to delete doctor");
    } finally {
      setLoadingId(null);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {patient.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No patients found
                  </td>
                </tr>
              ) : (
                patient.map((app, index) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {app.email}
                    </td>
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
}

export default Patient
