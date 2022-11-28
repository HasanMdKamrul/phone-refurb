import React from "react";
import "./Sppiner.css";

const SppinerBackground = () => {
  return (
    <div className="min-h-screen">
      <div className="background-loader">
        <div className="loader">
          <span className="spinner spinner1"></span>
          <span className="spinner spinner2"></span>
          <span className="spinner spinner3"></span>
          <br />
          <span className="loader-text">LOADING...</span>
        </div>
      </div>
    </div>
  );
};

export default SppinerBackground;
