import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const { image, tilte, price, _id, buyerEmail, paid, productId } = order;

  return (
    <div className="card  card-side bg-base-100 mt-5 border  shadow-2xl">
      <figure>
        <img src={image} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tilte}</h2>
        <small>Price: ${price}</small>

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
              <button className="btn btn-outline">Pay</button>
            </Link>
          ) : (
            <Link to={"/"}>
              <button className="btn btn-outline">Paid</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
