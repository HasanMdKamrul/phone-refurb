import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import {
  deleteSellerAndBuyer,
  loadSellersAndBuyers,
} from "../../../Apis/userApiAndToken";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const AllBuyers = () => {
  // ** Load All Sellers data

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", "buyer"],
    queryFn: async () => {
      try {
        const data = loadSellersAndBuyers("buyer");
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) {
    return <Sppiner />;
  }

  const { data: buyers } = data;

  const deleteHandler = async (buyer) => {
    // console.log(buyer._id);

    try {
      await deleteSellerAndBuyer(buyer._id);
      toast.success("Buyer Deleted");
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold">All Buyers</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>

                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers?.map((buyer, i) => (
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>{buyer?.email}</td>
                  <td>{buyer?.role}</td>
                  <td>
                    <button
                      onClick={() => deleteHandler(buyer)}
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

export default AllBuyers;
