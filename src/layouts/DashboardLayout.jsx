import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserRoleContext } from "../contexts/UserRoleProvider";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Sppiner from "../Pages/Shared/Sppiners/Sppiner";

const DashboardLayout = () => {
  const { role, loadingRole } = useContext(UserRoleContext);

  if (loadingRole) {
    return <Sppiner />;
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
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {role && role === "seller" ? (
              <>
                <li>
                  <Link to="/dashboard/addaproduct">Add A Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/myproducts">My Products</Link>
                </li>
              </>
            ) : (
              <Sppiner />
            )}

            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
