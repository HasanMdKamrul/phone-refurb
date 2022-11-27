import Lottie from "lottie-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import welcomeAnimation from "../../../assets/Animation/welcomeAnimation.json";
import { AuthContext } from "../../../contexts/AuthProvider";
import UseRole from "../../../Hooke/useRole";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { role, loadingRole } = UseRole(user?.email);

  if (loadingRole) {
    return (
      <div className="flex w-full justify-center items-center">
        <Sppiner />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-center text-5xl font-extrabold my-12">
          WELCOME TO <span>{role?.toUpperCase()}</span> DASHBOARD{" "}
        </h1>
      </div>
      <div className="flex  justify-center w-full ">
        <Lottie className="w-1/2" animationData={welcomeAnimation} />
      </div>
      <div className="flex justify-center items-center mt-12 ">
        {role === "buyer" && (
          <Link to="/">
            <button className="btn btn-outline ">Visit Home Page</button>
          </Link>
        )}
        {role === "admin" && (
          <div>
            <div className="flex justify-center items-center">
              <Link to="/dashboard/allsellers">
                <button className="btn btn-outline ">All Sellers</button>
              </Link>
              <Link to="/dashboard/allbuyers">
                <button className="btn btn-outline ml-2">All Buyers</button>
              </Link>
            </div>
            <section className="mt-12">
              <span className="text-gray-200 block">
                "Admin Can Manage The Website But Can't Buy or Book Products ||
                Or To Sell Anything You Must Have A Seller Account"
              </span>
              <Link to="/signup">
                <>
                  <span>Sign Up</span> as Buyer or Seller
                </>
              </Link>
            </section>
          </div>
        )}
        {role === "seller" && (
          <div>
            <div className="flex justify-center items-center">
              <Link to="/dashboard/addaproduct">
                <button className="btn btn-outline ">Add A Product</button>
              </Link>
              <Link to="/dashboard/myproducts">
                <button className="btn btn-outline ml-2">All Products</button>
              </Link>
            </div>
            <section className="mt-12">
              <span className="text-gray-200">
                "If you want to buy something kindly open a{" "}
                <Link to="/signup">
                  <span className="text-slate-900 mr-2">buyer</span>
                </Link>
                account"
              </span>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
