import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import SppinerBackground from "../../Pages/Shared/Sppiners/SppinerBackground";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  //   console.log(loading);
  if (loading) {
    return <SppinerBackground />;
  }

  if (user && user.uid) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
