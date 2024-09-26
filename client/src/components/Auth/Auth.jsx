import React from "react";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";
import { Navigate, useNavigate } from "react-router-dom";
const token = getUserFromLocalStorage();
const Auth = ({ children }) => {
  const navigate = useNavigate();
  return token ? children : <Navigate to={"/login"} />;
};

export default Auth;
