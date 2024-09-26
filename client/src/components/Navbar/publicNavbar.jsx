import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const PublicNavbar = () => {
  return (
    <div className='bg-gray-900 p-4 flex justify-between items-center text-white '>
      <h1 className='text-xl font-bold'>To-Do App</h1>
      <div>
        <Link
          to='/login'
          className='px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 mr-2'
        >
          Login
        </Link>
        <Link
          to='/register'
          className='px-4 py-2 rounded bg-gray-700 hover:bg-gray-600'
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default PublicNavbar;
