import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const { image, tilte, price, _id, buyerEmail, paid, productId } = order;

  return (
    <div class="flex max-w-md overflow-hidden bg-slate-900 hover:bg-transparent rounded-lg shadow-lg ">
      <div
        class="w-1/3 bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div class="w-2/3 p-4 md:p-4">
        <h1 class="text-2xl font-bold text-gray-200 ">{tilte}</h1>

        <div class="flex justify-between mt-3 item-center">
          <h1 class="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            $ <span className="text-gray-200">{price}</span>
          </h1>
          <div className="card-actions  justify-end">
            {!paid ? (
              <Link
                state={{
                  title: tilte,
                  price,
                  _id,
                  email: buyerEmail,
                  productId: productId,
                }}
                to={`/dashboard/payment/${_id}`}
              >
                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                  Pay
                </button>
              </Link>
            ) : (
              <Link to={"/"}>
                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                  Paid
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
