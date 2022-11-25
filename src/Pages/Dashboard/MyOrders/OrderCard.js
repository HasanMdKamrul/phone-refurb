import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  console.log(order);

  const { image, tilte, price, _id, buyerEmail } = order;

  return (
    <div className="card  card-side bg-base-100 mt-5 border  shadow-2xl">
      <figure>
        <img src={image} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{tilte}</h2>

        <div className="card-actions  justify-end">
          <Link
            state={{ title: tilte, price, _id, email: buyerEmail }}
            to={`/dashboard/payment/${_id}`}
          >
            <button className="btn btn-outline">Pay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
