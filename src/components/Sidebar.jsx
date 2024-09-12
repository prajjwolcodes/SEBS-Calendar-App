import React from 'react';
import logo from "../assets/logo.jpeg"
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col items-center">
      {/* User Image */}
      <div className="w-32 h-32 flex justify-center items-center rounded-full bg-white overflow-hidden my-4">
        <img
          src={logo}
          alt="User"
          className="w-24 h-24 object-cover"
        />
      </div>

      {/* User Name */}
      <h1 className="text-2xl font-semibold">SEBS</h1>

      <div className='w-full border-b mt-10 border-white '></div>
      {/* Rest of the sidebar content */}
      <div >
        <nav className="mt-10 w-full">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded w-full block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/appointments" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded w-full block">
                Appointments
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded w-full block">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
