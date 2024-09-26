import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/Slice/createSlice";
import { json, useNavigate } from "react-router-dom";
import { encryptData } from "../../utils/crypto";
import AlertMessage from "../ErrorMessage/AlertMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string().min(4).required("Minimum 4 characters required"),
});
const login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });
  const {
    values,
    errors,
    handleBlur,
    handleReset,
    handleSubmit,
    handleChange,
    isPending,
    touched,
  } = useFormik({
    initialValues: {
      email: "register@gmail.com",
      password: "123456789",
    },
    validationSchema,
    onSubmit: (data) => {
      mutateAsync(data).then((data) => {
        dispatch(loginAction(data));
        // const encryptedData = encryptData(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
      });
    },
  });
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) navigate("/");
    }, 1000);
  }, [isSuccess]);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
      {isError && (
        <AlertMessage type='error' message={"Check Email and password"} />
      )}
      {isSuccess && (
        <AlertMessage
          type='success'
          message={"Login Success redirect to Home ...."}
        />
      )}
      {isPending && (
        <AlertMessage type='loading' message={"logging You in ....."} />
      )}
      <form
        onSubmit={handleSubmit}
        className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-md'
      >
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
            value={values?.email}
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
            value={values?.password}
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
        <button
          type='submit'
          onChange={handleReset}
          className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default login;
