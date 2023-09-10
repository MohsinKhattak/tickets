import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  // Retrieve the token from the Redux store
  const token = useSelector((state) => state.user.token);

  // Check if the token exists
  const isLoggedIn = !!token;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
