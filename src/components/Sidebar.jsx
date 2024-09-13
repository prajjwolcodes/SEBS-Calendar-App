import React from 'react';
import logo from "../assets/logo.jpeg"
import { Link, useLocation } from 'react-router-dom';
import { IoHomeSharp, IoBookmark } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      {/* User Image */}
      <div className='w-full flex flex-col justify-center items-center'>
        <div className="w-20 h-20 lg:w-28 lg:h-28 flex justify-center items-center rounded-full bg-white overflow-hidden my-6">
          <img
            src={logo}
            alt="User"
            className="w-14 h-14 lg:w-20 lg:h-20 object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold">SEBS</h1>

      </div>

      <div className='w-full border-b mt-6 border-white '></div>
      <div >
        <nav className="mt-6 w-full px-3 lg:px-8">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className={`text-base p-2 rounded w-full block ${location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}>
                <div className="flex text-sm lg:text-base gap-2 items-center" >
                  <IoHomeSharp /> <span> Home </span>
                </div>

              </Link>
            </li>
            <li>
              <Link to="/appointments" className={`text-base p-2 rounded w-full block ${location.pathname === '/appointments' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}>
                <div className="flex text-sm lg:text-base gap-2 items-center" >
                  <IoBookmark /><span>All Appointments</span>
                </div>
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
