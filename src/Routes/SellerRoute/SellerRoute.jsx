import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { UserRoleContext } from "../../contexts/UserRoleProvider";
import Sppiner from "../../Pages/Shared/Sppiners/Sppiner";

const SellerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  const { role, loadingRole } = useContext(UserRoleContext);

  if (loading || loadingRole) {
    return <Sppiner />;
  }

  if (user && role === "seller") {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default SellerRoute;
