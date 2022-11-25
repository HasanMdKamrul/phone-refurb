import React, { useContext } from "react";
import toast from "react-hot-toast";
import { saveOrder } from "../../../Apis/OrderApi";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ product, setProduct }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
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

  const handleProductBooking = async (event) => {
    event.preventDefault();
    // console.log(event);

    const form = event.target;

    const buyerMobile = form.buyersphoneno.value;
    const mettingLocation = form.mettinglocation.value;

    // console.log(buyerMobile, mettingLocation);

    // ** Order Booking / My Order

    const orderObject = {
      tilte: name,
      productId: _id,
      image: productImage,
      buyerEmail: user?.email,
      price: purchaseprice,
      buyerMobile,
      mettingLocation,
    };

    // ** Save the order to db

    try {
      const data = await saveOrder(orderObject);
      console.log(data);
      if (data.insertedId) {
        toast.success("Product Booking Successfull");
      }
    } catch (error) {
      console.log(error.message);
    }

    setProduct(null);
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <form onSubmit={handleProductBooking} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="py-4">
            <input
              disabled
              defaultValue={user?.displayName}
              type="text"
              placeholder="Type here"
              className="input mt-2 input-bordered w-full"
            />
            <input
              disabled
              defaultValue={user?.email}
              type="text"
              placeholder="Type here"
              className="input input-bordered mt-2 w-full"
            />
            <input
              disabled
              defaultValue={`${sellingprice} ${"$"}`}
              type="text"
              placeholder="Type here"
              className="input input-bordered mt-2 w-full"
            />
            <input
              required
              name="buyersphoneno"
              type="text"
              placeholder="Phone No"
              className="input input-bordered mt-2 w-full"
            />
            <input
              required
              name="mettinglocation"
              type="text"
              placeholder="Metting Location"
              className="input input-bordered mt-2 w-full"
            />
          </p>
          <div className="modal-action">
            <button type="submit" htmlFor="booking-modal" className="btn">
              Book
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingModal;
