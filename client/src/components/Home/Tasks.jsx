import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAPI, listsAPI } from "../../services/categoriesServices";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Oops Title is missing"),
  description: Yup.string().required("Uh !oh You Forgot Description"),
  date: Yup.string().required("How you will Without Date ? "),
});

const Tasks = () => {
  const { isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: createAPI,
    mutationKey: ["create Task"],
  });

  const {
    errors,
    handleBlur,
    handleReset,
    handleSubmit,
    touched,
    handleChange,
    values,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutateAsync(values);
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/list");
      }
    }, 1200);

  }, [isSuccess]);
  return (
    <>
      <div className='w-full h-full flex justify-center flex-col items-center '>
        <h1 className='text-4xl mt-20'>Create Tasks and List </h1>
        <form onSubmit={handleSubmit} className='space-y-4 w-3/4'>
          <div className='flex flex-col'>
            <label htmlFor='title' className='text-lg text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={values?.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Enter task title'
              className='p-2 border border-gray-300 rounded-md '
            />
            {errors.title && touched.title && (
              <p className='text-sm text-red-500'>{errors.title}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor='description' className='text-lg text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={values?.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Enter task description'
              className='p-2 border border-gray-300 rounded-md'
            />
            {errors.description && touched.description && (
              <p className='text-sm text-red-500'>{errors.description}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor='date' className='text-lg text-gray-700'>
              Date
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={values?.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className='p-2 border border-gray-300 rounded-md'
            />
            {errors.date && touched.date && (
              <p className='text-sm text-red-500'>{errors.date}</p>
            )}
          </div>

          <button
            type='submit'
            onChange={handleReset}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Tasks;
