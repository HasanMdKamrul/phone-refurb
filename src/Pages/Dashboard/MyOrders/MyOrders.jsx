import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  // ** get all the orders according to user email

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", `${user?.email}`],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/orders/${user?.email}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  console.log(orders);

  return (
    <div className="mt-5">
      <div>
        <h1 className="text-center font-extrabold text-5xl">Your Orders</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 my-2">
        {orders?.map((order) => (
          <OrderCard key={order?._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
