import React from "react";

const Home = () => {
  return (
    <div className='  w-full h-full pointer-events-none'>
      <div className=' z-10 flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold text-center'>
          Welcome to Our To-Do App
        </h1>
        <p className='mt-4 text-lg text-center'>This is a simple To-do App</p>
      </div>
    </div>
  );
};

export default Home;
