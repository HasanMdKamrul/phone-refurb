import React, { useState } from "react";
import toast from "react-hot-toast";
import { productAdvertiseOrReported } from "../../../../Apis/productsApi";

const ProductCard = ({ product, handleModal }) => {
  const [loading, setLoading] = useState(false);
  //   console.log(product);

  const {
    condition,
    description,
    mobile,
    name,
    postingTime,
    productCategoryId,
    productImage,
    purchaseprice,
    purchaseyear,
    sellerEmail,
    sellerName,
    sellingprice,
    usagetime,
  } = product;

  const handleReportedItems = async (product) => {
    console.log(product);
    // ** products listed as reported

    product.reported = "reported";

    try {
      setLoading(true);
      const data = await productAdvertiseOrReported(product);
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
    <div className="card my-12 lg:card-side p-12 bg-base-100 shadow-xl">
      <figure>
        <img className="w-56 h-fit" src={productImage} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Description : {description}</p>
        <p>Condition : {condition}</p>
        <p>Purchase Price : ${purchaseprice}</p>
        <p>Selling Price : ${sellingprice}</p>
        <p>Purchase Year: {purchaseyear}</p>
        <p>Seller : {sellerName}</p>
        <p>Useage Time : {usagetime} Yrs</p>
        <p>When Posted : {postingTime}</p>
        <p>Seller No : {mobile}</p>

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
  );
};

export default ProductCard;
