import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../../context/AuthContext";


const PrivateRoute = () => {
  const { isUserLogin } = useContext(AuthContext);

  return isUserLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;