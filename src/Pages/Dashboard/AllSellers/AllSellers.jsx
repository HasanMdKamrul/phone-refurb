import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import {
  deleteSellerAndBuyer,
  loadSellersAndBuyers,
} from "../../../Apis/userApiAndToken";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const AllSellers = () => {
  // ** Load All Sellers data

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", "seller"],
    queryFn: async () => {
      try {
        const data = loadSellersAndBuyers("seller");
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) {
    return <Sppiner />;
  }

  const { data: sellers } = data;

  const deleteHandler = async (seller) => {
    console.log(seller._id);

    try {
      await deleteSellerAndBuyer(seller._id);
      toast.success("Seller Deleted");
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold">All Sellers</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>

                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>{seller?.role}</td>
                  <td>
                    <button
                      onClick={() => deleteHandler(seller)}
                      className="btn btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSellers;
