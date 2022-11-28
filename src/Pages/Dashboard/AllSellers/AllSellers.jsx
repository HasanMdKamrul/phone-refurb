import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdVerifiedUser } from "react-icons/md";
import {
  deleteSellerAndBuyer,
  loadSellersAndBuyers,
  sellerVerification,
} from "../../../Apis/userApiAndToken";
import SppinerBackground from "../../Shared/Sppiners/SppinerBackground";

const AllSellers = () => {
  // ** Load All Sellers data

  const [sellerId, setSellerId] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", "seller", "sellerverify", `${sellerId}`],
    queryFn: async () => {
      try {
        const data = loadSellersAndBuyers("seller");
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

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

  const sellerVerifyHandle = async (seller) => {
    console.log(seller._id);

    // ** Seller verification update;

    seller.verifyStatus = "verified";

    try {
      const data = await sellerVerification(seller);

      if (data.modifiedCount) {
        toast.success("Seller Verified");
        refetch();
        setSellerId(seller._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <SppinerBackground />;
  }

  return (
    <div className="my-8 flex  items-center flex-col">
      <div>
        <h1 className="text-center text-3xl font-bold">All Sellers</h1>
      </div>
      <div>
        <div className="overflow-x-auto mt-12 ">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>

                <th>Email</th>
                <th>Verification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    {seller.verifyStatus ? (
                      <MdVerifiedUser className="text-blue w-24 h-6" />
                    ) : (
                      <button
                        onClick={() => sellerVerifyHandle(seller)}
                        className="btn btn-sm"
                      >
                        Verify Seller
                      </button>
                    )}
                  </td>
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
