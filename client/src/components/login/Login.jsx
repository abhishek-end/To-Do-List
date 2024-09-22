import React from "react";



const login = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6 text-center'>Register</h1>
      <form
        // onSubmit={handleSubmit}
        className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'
      >
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.username}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
         
              `}
          />
          {/* {errors.username && touched.username && (
            <p className='text-sm text-red-500'>{errors.username}</p>
          )} */}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.email}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2`}
          />
          {/* {errors.email && touched.email && (
              <p className='text-sm text-red-500'>{errors.email}</p>
            )} */}
        </div>
      </form>
    </div>
  );
};

export default login;
