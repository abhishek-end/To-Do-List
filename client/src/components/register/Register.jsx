import React from "react";
import * as Yup from "yup";
import { isString, useFormik } from "formik";
import { useMatch, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../services/userServices";

const Register = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is Required")
      .min(2, "At Least 2 words need"),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().min(4).required("Minimum 4 characters required"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "password must match"),
  });
  const navigate = useNavigate();

  const {
    isError,
    isSuccess,
    isPending,
    errors: error,
    mutateAsync,
  } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);
      handleReset();
      mutateAsync(value)
        .then((value) => {
          if (isSuccess) navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <h1 className='text-2xl font-bold mb-6 text-center'>Register</h1>
      {isError ?? {
        error: "success",
      }}
      <form
        onSubmit={handleSubmit}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
              ${
                errors.username && touched.username
                  ? "border-red-500"
                  : "border-blue-500"
              }
              `}
          />
          {errors.username && touched.username && (
            <p className='text-sm text-red-500'>{errors.username}</p>
          )}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
              ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-blue-500"
              }
              `}
          />
          {errors.email && touched.email && (
            <p className='text-sm text-red-500'>{errors.email}</p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
              ${
                errors.password && touched.password
                  ? "border-red-500"
                  : "border-blue-500"
              }
              `}
          />
          {errors.password && touched.password && (
            <p className='text-sm text-red-500'>{errors.password}</p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2
              ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500"
                  : "border-blue-500"
              }
              `}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className='text-sm text-red-500'>{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type='submit'
          onChange={handleReset}
          className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200'
        >
          Register
        </button>
      </form>
    </>
  );
};
export default Register;
