import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ caterory }) => {
  return (
    <Link to={`/category/${caterory?._id}`}>
      <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2">
          <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">
            {caterory?.categoryName}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {caterory?.categoryDescription &&
              caterory?.categoryDescription.slice(0, 150) + "..."}
          </p>
        </div>

        <img
          className="object-cover w-full h-48 mt-2"
          src={caterory?.categoryImage}
          alt=""
        />

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-lg font-bold text-white">Num of products</h1>
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
            See Products
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
