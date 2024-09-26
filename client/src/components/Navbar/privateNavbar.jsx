import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaHome, FaTasks, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div
      className={`bg-gray-900 h-screen flex flex-col items-start transition-all duration-300 fixed z-10   ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Hamburger Icon */}
      <div
        className='p-4 text-white cursor-pointer flex text-lg'
        onClick={handleToggle}
      >
        <FaBars size={24} />
        {isExpanded && <span className='ml-4 text-lg'>ToDo</span>}
      </div>

      {/* Menu Items */}
      <ul className='flex-1 w-full space-y-4'>
        <Link to={"/"}>
          <li className='flex items-center p-4 text-white cursor-pointer hover:bg-gray-700'>
            <FaHome size={24} />
            {isExpanded && <span className='ml-4 text-lg'>Home</span>}
          </li>
        </Link>
        <Link to={"/list"}>
          <li className='flex items-center p-4 text-white cursor-pointer hover:bg-gray-700'>
            <FaTasks size={24} />
            {isExpanded && <span className='ml-4 text-lg'>Tasks</span>}
          </li>
        </Link>
      </ul>

      {/* Sign-Out Button */}
      <div
        className='w-full p-4 text-white cursor-pointer hover:bg-gray-700 flex items-center'
        onClick={() => {
          handleLogout();
        }}
      >
        <FaSignOutAlt size={24} />
        {isExpanded && <span className='ml-4 text-lg'>Sign Out</span>}
      </div>
    </div>
  );
};

export default PrivateNavbar;
