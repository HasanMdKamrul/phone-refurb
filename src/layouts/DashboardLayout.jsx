import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import UseRole from "../Hooke/useRole";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import SppinerBackground from "../Pages/Shared/Sppiners/SppinerBackground";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const { role, loadingRole } = UseRole(user?.email);

  if (loadingRole) {
    return <SppinerBackground />;
  }

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile drawer-end">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {role && role === "seller" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/addaproduct"
                  >
                    Add A Product
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/myproducts"
                  >
                    My Products
                  </NavLink>
                </li>
              </>
            )}
            {role && role === "admin" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/allsellers"
                  >
                    All Sellers
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/allbuyers"
                  >
                    All Buyers
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/reportedProducts"
                  >
                    Reported Products
                  </NavLink>
                </li>
              </>
            )}
            {role && role === "buyer" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && "border-b border-gray-200 text-blue-600"
                    }
                    to="/dashboard/myorders"
                  >
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
