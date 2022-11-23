import React from "react";
import { Typewriter } from "react-simple-typewriter";
import bannerImage from "../../../assets/Images/20945853.jpg";
const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-orange-300">
            Phone-Refurb
          </h1>
          <p className="mt-5 text-sky-400 font-extrabold text-3xl h-[50px]  ">
            <Typewriter loop words={["Re-Sale Buy Dream"]} />
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
