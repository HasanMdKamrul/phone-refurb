import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  //   console.log(category.categoryName);

  return (
    <div className="flex justify-center items-center">
      <Link
        state={{ categoryName: category?.categoryName }}
        to={`/category/${category?._id}`}
      >
        <div className="max-w-md h-96 w-96 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="px-4 py-2">
            <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">
              {category?.categoryName}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {category?.categoryDescription}
              {/* {category?.categoryDescription &&
                category?.categoryDescription.slice(0, 150) + "..."} */}
            </p>
          </div>

          <img
            className="object-cover w-full h-48 mt-2"
            src={category?.categoryImage}
            alt=""
          />

          <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
            <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
              See Products
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
