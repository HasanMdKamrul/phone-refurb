import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import bannerImage from "../../../assets/Images/Image/symbol-scatter-haikei.svg";
const Banner = () => {
  return (
    <div
      className="hero h-screen  bg-no-repeat bg-cover "
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="hero-overlay  bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-gray-100">
            Phone-Refurb
          </h1>
          <p className="mt-5 text-slate-900 font-extrabold text-3xl h-[100px]  ">
            <Typewriter loop words={["Re-Sale | Buy | Exchange"]} />
          </p>
          <Link to={`/signup`}>
            <button className="btn btn-outline">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
