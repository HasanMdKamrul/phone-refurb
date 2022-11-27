import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import Sppiner from "../../Shared/Sppiners/Sppiner";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  // ** get all the orders according to user email

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", `${user?.email}`],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/orders/${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <Sppiner />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="my-8">
        <h1 className="text-center font-extrabold text-5xl">Your Orders</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-5 grid-cols-1 gap-5 my-2">
        {orders?.map((order) => (
          <OrderCard key={order?._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
