import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import axiosInstance from "../../Services/axios";
import { Api_Paths } from "../../Services/apiPath";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState(null);
   const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    availableFrom: "",
    availableTo: ""
  });
  const [formError, setFormError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axiosInstance.get(Api_Paths.Admin.Get_Doctors);
      setDoctors(res.data);
    } catch (err) {
      setError("Failed to fetch Doctors");
    }
  };
  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAddDoctor = async () => {
    if (!formData.name || !formData.specialization || !formData.availableFrom || !formData.availableTo) {
      setFormError("All fields are required");
      return;
    }
    setFormError("");
    setAdding(true);
    try {
      const res = await axiosInstance.post(Api_Paths.Admin.Add_Doctor, formData);
      setShowForm(false);
      setFormData({ name: "", specialization: "", availableFrom: "", availableTo: "" });
      fetchDoctors(); // refresh list
    } catch (err) {
      setFormError("Failed to add doctor");
    } finally {
      setAdding(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Doctor?")) return;
    setLoadingId(id);
    try {
      await axiosInstance.delete(Api_Paths.Admin.Delete_doctor(id));
      // remove from UI instantly
      setDoctors(prev => prev.filter(app => app.id !== id));
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

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
          >
            {showForm ? "Cancel" : "+ Add Doctor"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {showForm && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Doctor</h2>

            {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. John"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Specialization</label>
                <input
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Cardiologist"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Available From</label>
                <input
                  name="availableFrom"
                  type="time"
                  value={formData.availableFrom}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Available To</label>
                <input
                  name="availableTo"
                  type="time"
                  value={formData.availableTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              onClick={handleAddDoctor}
              disabled={adding}
              className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add Doctor"}
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Specialization</th>
                <th className="px-6 py-4">Availiability</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((app, index) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {app.specialization}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      <span className="text-green-600 font-medium">
                        {formatTime(app.availableFrom)}
                      </span>
                      <span className="text-gray-400 mx-1">—</span>
                      <span className="text-red-500 font-medium">
                        {formatTime(app.availableTo)}
                      </span>
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
};

export default Doctor;
