import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import UseRole from "../../Hooke/useRole";
import Sppiner from "../../Pages/Shared/Sppiners/Sppiner";

const AdminRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  const { role, loadingRole } = UseRole(user?.email);

  if (loading || loadingRole) {
    return <Sppiner />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminRoute;
