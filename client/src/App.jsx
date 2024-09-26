import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/Home/Home";
import Login from "./components/login/login";
import PrivateNavbar from "./components/Navbar/privateNavbar";
import PublicNavbar from "./components/Navbar/publicNavbar";
import { useSelector } from "react-redux";
import Tasks from "./components/Home/Tasks";
import ListTask from "./components/Home/ListTask";
import Auth from "./components/Auth/Auth";

const App = () => {
  const users = useSelector((state) => state?.login?.user);
  return (
    <div>
      <Router>
        {users ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/tasks'
            element={
              <Auth>
                <Tasks />
              </Auth>
            }
          />
          <Route
            path='/list'
            element={
              <Auth>
                <ListTask />
              </Auth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
