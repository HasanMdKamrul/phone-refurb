import React from "react";
import { MdBuild, MdDescription } from "react-icons/md";

const AdvertiseProducts = ({ product, handleModal }) => {
  console.log(product);

  const { productImage, description, sellingprice, condition, name } = product;

  return (
    <div className="flex max-w-md my-12 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div
        className="w-1/3 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${productImage})`,
        }}
      ></div>

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {name}
        </h1>

        <div className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <MdDescription className="w-6 mr-2 text-blue-500 h-6" />
            {description.length > 100 ? description.slice(0, 100) : description}
          </div>
        </div>

        <div className="flex mt-2 items-center  text-gray-200">
          <MdBuild className="mr-2 h-6 w-6 text-blue-500" />
          <span className="font-bold"> {condition}</span>
        </div>

        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            <span className="text-blue-500 text-2xl mr-1">$</span>
            {sellingprice}
          </h1>
          <div className="card-actions justify-end">
            <label
              onClick={() => handleModal(product)}
              htmlFor="booking-modal"
              className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseProducts;
