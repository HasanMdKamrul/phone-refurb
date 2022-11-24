import React from "react";

const ProductCard = ({ product, handleModal }) => {
  console.log(product);

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
      </div>
    </div>
  );
};

export default ProductCard;