import React from "react";
import image from "../../../assets/Images/phonerepp.avif";

const Aboutus = () => {
  return (
    <div className="flex justify-center my-12 items-center   ">
      <div className="w-1/2 flex justify-center mx-5">
        <img className="rounded-2xl lg:p-20" src={image} alt="" />
      </div>
      <div className="w-1/2 mx-5">
        <h1 className="text-slate-300 text-3xl font-bold">
          Who is Phone-Refurb?
        </h1>
        <p className=" text-gray-200 text-lg mt-12">
          Phone-Refurb is Europe's leading technology company for professionally
          refurbished phones. Because we professionally refurbish all devices
          ourselves and sell them directly, we can offer phones that work like
          new at a much lower price. Just like new, at Phone-Refurb we offer a
          full warranty, fast delivery and first class customer service.
          Incidentally, "Refurbished" is also good for the environment. So why
          wait? Buy smart. Not new.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
