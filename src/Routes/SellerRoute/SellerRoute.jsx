import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import UseRole from "../../Hooke/useRole";
import SppinerBackground from "../../Pages/Shared/Sppiners/SppinerBackground";

const SellerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  const { role, loadingRole } = UseRole(user?.email);

  if (loading || loadingRole) {
    return <SppinerBackground />;
  }

  if (user && role === "seller") {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default SellerRoute;
