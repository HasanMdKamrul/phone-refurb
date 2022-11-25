import React from "react";

const AdvertiseProducts = ({ product, handleModal }) => {
  console.log(product);

  const { productImage, description, sellingprice, condition, name } = product;

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={productImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          {description.length > 100 ? description.slice(0, 100) : description}
        </p>
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

export default AdvertiseProducts;
