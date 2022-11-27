import React, { useContext } from "react";
import toast from "react-hot-toast";
import { MdLogin, MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Images/Image/logo.svg";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logOut, setLoading } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logOut();
      toast.success("User Logout...");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 p-2 text-blue-500 font-bold"
              : "p-2 font-bold"
          }
        >
          Home
        </NavLink>
        {user && user?.uid && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 p-2 text-blue-500 ml-2 font-semibold"
                : "ml-2 p-2 font-bold"
            }
          >
            Dashboard
          </NavLink>
        )}
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 p-2 ml-2 text-blue-500 font-semibold"
              : "p-2 font-bold"
          }
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <img className="md:w-24 w-12" src={logo} alt="" />
            <Link to="/" className="btn btn-ghost  normal-case md:text-xl ">
              Phone-Refurb
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" p-0">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          {user && user.uid ? (
            <>
              <MdLogout onClick={handleSignOut} />
            </>
          ) : (
            <Link to="signin">
              <MdLogin />
            </Link>
          )}
        </div>
        <div className="dropdown">
          <label
            htmlFor="sidebar-drawer"
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
