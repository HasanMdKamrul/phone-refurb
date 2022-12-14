import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  MdBuild,
  MdClear,
  MdPriceChange,
  MdPriceCheck,
  MdProductionQuantityLimits,
  MdSendToMobile,
  MdTimelapse,
  MdTimeline,
  MdTimer,
  MdVerified,
} from "react-icons/md";
import { productReported } from "../../../../Apis/productsApi";
import { AuthContext } from "../../../../contexts/AuthProvider";

const ProductCard = ({ product, handleModal }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //   console.log(product);

  const {
    condition,
    description,
    sellerEmail,
    mobile,
    name,
    postingTime,
    productImage,
    purchaseprice,
    purchaseyear,
    location,
    sellerName,
    sellingprice,
    usagetime,
  } = product;

  console.log(product);

  const handleReportedItems = async (product) => {
    console.log(product);
    // ** products listed as reported

    product.reported = "reported";

    try {
      setLoading(true);
      const data = await productReported(product, user?.email);
      console.log(data);
      setLoading(false);
      if (data.success) {
        toast.success("Product report send to Admin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!product?.paid && (
        <div class="w-full mt-12 max-w-lg overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          {/* <img class="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"> */}

          <img
            className="object-cover object-center w-full h-56"
            src={productImage}
            alt=""
          />

          <div class="flex items-center px-6 py-3 bg-gray-900">
            <MdProductionQuantityLimits className="text-white w-6 h-6" />

            <h1 class="mx-3 text-lg font-semibold text-white">{name}</h1>
          </div>

          <div class="px-6 py-4">
            <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
              Posted By: {sellerName}
            </h1>

            <p class="py-2 text-gray-700 dark:text-gray-400">{description}</p>

            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdBuild className="w-6 h-6" />

              <h1 class="px-2 text-sm">{condition}</h1>
            </div>

            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <svg
                aria-label="location pin icon"
                class="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                />
              </svg>

              <h1 class="px-2 text-sm">{location}</h1>
            </div>

            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <svg
                aria-label="email icon"
                class="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                />
              </svg>

              <h1 class="px-2 text-sm">{sellerEmail}</h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdPriceCheck className="w-6 h-6" />

              <h1 class="px-2 text-sm">Selling Price : {sellingprice}</h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdPriceChange className="w-6 h-6" />

              <h1 class="px-2 text-sm">Purchase Price : {purchaseprice}</h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdTimer className="w-6 h-6" />

              <h1 class="px-2 text-sm">Purchase Year : {purchaseyear}</h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdTimelapse className="w-6 h-6" />

              <h1 class="px-2 text-sm">Usage Time : {usagetime} Years</h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdTimeline className="w-6 h-6" />

              <h1 class="px-2 text-sm">When Posted : {postingTime} </h1>
            </div>
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <MdSendToMobile className="w-6 h-6" />
              <h1 class="px-2 text-sm">Contact No : {mobile} </h1>
            </div>
            {product?.sellerVerified ? (
              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <MdVerified className="w-6 h-6" />
                <h1 class="px-2 text-sm">Seller Verified</h1>
              </div>
            ) : (
              <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <MdClear className="w-6 h-6" />
                <h1 class="px-2 text-sm">Seller Verified: X </h1>
              </div>
            )}
            <div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <label
                onClick={() => handleModal(product)}
                htmlFor="booking-modal"
                className="btn btn-ghost bg-gray-600 btn-sm"
              >
                Book Now
              </label>
              <button
                onClick={() => handleReportedItems(product)}
                className="btn btn-sm btn-outline ml-2 bg-gray-200"
              >
                Report To Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
