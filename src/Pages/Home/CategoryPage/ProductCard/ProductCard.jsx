import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { productReported } from "../../../../Apis/productsApi";
import { AuthContext } from "../../../../contexts/AuthProvider";

const ProductCard = ({ product, handleModal }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //   console.log(product);

  const {
    condition,
    description,
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
        <div className="card my-12 lg:card-side p-12 bg-base-100 shadow-xl">
          <figure>
            <img className="w-56 h-fit" src={productImage} alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>Description : {description}</p>
            <p>Location : {location}</p>
            <p>Condition : {condition}</p>
            <p>Purchase Price : ${purchaseprice}</p>
            <p>Selling Price : ${sellingprice}</p>
            <p>Purchase Year: {purchaseyear}</p>
            <p>Seller : {sellerName}</p>
            <p>Useage Time : {usagetime} Yrs</p>
            <p>When Posted : {postingTime}</p>
            <p>Seller No : {mobile}</p>
            {product?.sellerVerified ? (
              <div className="flex  items-center">
                <span>Seller Verified:</span>
                <MdVerified />
              </div>
            ) : (
              <>
                <span>Seller Verified : X</span>
              </>
            )}

            <div className="card-actions justify-end">
              <label
                onClick={() => handleModal(product)}
                htmlFor="booking-modal"
                className="btn"
              >
                Book Now
              </label>
            </div>
            <div>
              <button
                onClick={() => handleReportedItems(product)}
                className="btn btn-outline"
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
