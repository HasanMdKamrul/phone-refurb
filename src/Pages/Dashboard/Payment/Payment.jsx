import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { price, title, _id, email } = location?.state;
  console.log(price, title);

  return (
    <div>
      <div>
        <p className="text-2xl">
          Kindly Pay $<span className="font-bold">{price}</span> for this{" "}
          {title}
        </p>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            orderId={_id}
            price={price}
            email={email}
            name={user?.displayName}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
