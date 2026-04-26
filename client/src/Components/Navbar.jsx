import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const role = user?.role;

  const LinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white pb-1"
      : "text-blue-100 hover:text-white transition duration-200";
  
      const handleLogout =() =>{
        localStorage.removeItem("token");
        navigate("/login");
      }

  return (
    <div>
      <nav className="bg-blue-700 px-8 py-4 flex items-center justify-between shadow-md">
        <div className="text-white text-xl font-bold tracking-wide">
          Doc<span className="text-blue-200 ">Book</span>
        </div>

        <div className="flex items-center gap-8">
          <NavLink to="/admin-dashboard" className={LinkClass}>
            Dashboard
          </NavLink>

          {role == "Patient" && (
            <>
              <NavLink to="/appointments" className={LinkClass}>
                My Appointments
              </NavLink>
            </>
          )}
          {role == "Admin" && (
            <>
              <NavLink to="/admin/appointment" className={LinkClass}>
                Appointments
              </NavLink>

              <NavLink to="/admin/doctor" className={LinkClass}>
                Doctor
              </NavLink>
              <NavLink to="/admin/patient" className={LinkClass}>
                Patient
              </NavLink>
              <span>{role}</span>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
