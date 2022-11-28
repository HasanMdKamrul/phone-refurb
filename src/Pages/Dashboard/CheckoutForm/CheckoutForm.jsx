import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SppinerBackground from "../../Shared/Sppiners/SppinerBackground";

const CheckoutForm = ({ orderId, price, email, name, productId }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const [paidProduct, setPaidProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSingleProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/productspaid/${productId}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setPaidProduct(data.paid);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadSingleProduct();
  }, [productId]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // ** Now we need to get the card data entered by the user
    const card = elements.getElement(CardElement);

    console.log(card);

    // ** If card data null then return
    if (card === null) {
      return;
    }

    // ** step-1 ekhon ekta payment method create korbo

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card", //** kon type er payment hobe -> creadit or debit related */
      card,
    });

    //   ** Handle Error
    if (error) {
      console.log(error);
      setCardError(error.message);
      return;
    } else {
      setCardError("");
    }

    setProcessing("");

    // ** Step-2 now we have to confirm payment
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

    setProcessing(false);

    // ** Check the confirm payment error

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    } else {
      setCardError("");
    }

    // const { status, id } = paymentIntent;

    console.log(paymentIntent);

    if (paymentIntent?.status === "succeeded") {
      //   ** saving the payments data to db
      const payment = {
        email,
        orderId,
        transectionId: paymentIntent.id,
        price,
      };
      console.log(payment);
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/payments`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payment),
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {
          toast.success("Congrats! your payment completed");
          //   ** Now time to delte the product from the main products
          console.log(productId);
          // const data = await deleteProductAfterPayment(productId);
          // console.log(data);

          // ** Update products paid status

          try {
            const response = await fetch(
              `${process.env.REACT_APP_URL}/products/${productId}`,
              {
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                  authorization: `bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ paid: true }),
              }
            );
            const data = await response.json();

            console.log(data);
          } catch (error) {
            console.log(error.message);
          }

          navigate("/dashboard/myorders");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (loading) {
    return <SppinerBackground />;
  }

  return (
    <>
      {!paidProduct ? (
        <div className="px-12 border py-24 mx-auto  bg-transparent shadow w-full lg:w-[800px] my-12 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "24px",
                    color: "#424770",
                    "::placeholder": {
                      color: "black",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              className="btn btn-sm mt-6"
              type="submit"
              disabled={!stripe || !clientSecret || processing}
            >
              Pay
            </button>
          </form>
          {cardError && <p className="text-red-600">{cardError}</p>}
        </div>
      ) : (
        <div>Product is already sold out!</div>
      )}
    </>
  );
};

export default CheckoutForm;
