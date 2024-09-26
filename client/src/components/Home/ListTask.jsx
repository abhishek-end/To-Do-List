import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  deleteAPI,
  listsAPI,
  updateAPI,
} from "../../services/categoriesServices";
import { FaPlus } from "react-icons/fa"; // Plus icon
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { data, isSuccess, refetch } = useQuery({
    queryFn: listsAPI,
    queryKey: ["lists"],
  });

  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: deleteAPI,
    mutationKey: ["delete"],
    onSuccess: () => refetch(),
  });

  const { mutateAsync: updateMutate } = useMutation({
    mutationFn: updateAPI,
    mutationKey: ["task complete or not"],
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id) => {
    try {
      await deleteMutate(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (id, currentDoneStatus) => {
    try {
      const update = !currentDoneStatus;
      await updateMutate({ id, done: update });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const navigate = useNavigate();
  const tasks = data?.category || [];

  return (
    <div className='container mx-auto p-4 '>
      <h1 className='text-3xl font-bold text-center mb-4'>Task List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
        {isSuccess && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className='bg-black transition-all hover:bg-gray-800  rounded-lg shadow-lg p-4 flex flex-col justify-between text-white'
            >
              <div className='w-full h-full flex justify-between flex-col'>
                <h2 className='text-xl font-semibold '>{task.title}</h2>
                <p className='text-white'>{task.description}</p>
                <p className='text-white text-sm'>
                  {new Date(task.date).toLocaleDateString()}
                </p>
              </div>
              <div className='flex justify-between mt-4'>
                <button
                  className='bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600'
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
                <button
                  className={`text-white py-1 px-3 rounded ${
                    task.done ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => {
                    handleUpdate(task._id);
                  }}
                >
                  {task.done ? "Completed" : "Complete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='bg-black transition-all h-44 w-full text-white rounded-lg shadow-lg flex justify-center items-center cursor-pointer hover:bg-gray-800'>
            <p className='text-center'>No tasks available.</p>
          </div>
        )}

        {/* Add Task Button */}
        <div
          className='bg-gray-500 transition-all h-44 w-full text-white rounded-lg shadow-lg flex justify-center items-center cursor-pointer hover:bg-gray-800'
          onClick={() => {
            navigate("/tasks");
          }}
        >
          <FaPlus size={40} />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
