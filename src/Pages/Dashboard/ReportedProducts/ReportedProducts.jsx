import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import {
  deleteReportedProduct,
  getReportedProducts,
} from "../../../Apis/productsApi";
import SppinerBackground from "../../Shared/Sppiners/SppinerBackground";

const ReportedProducts = () => {
  // ** get all reported products here

  const {
    data: reportedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedproducts"],

    queryFn: async () => {
      try {
        const data = await getReportedProducts();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const deleteHandler = async (product) => {
    // ** Delete the reported item from db

    try {
      const data = await deleteReportedProduct(product._id);
      if (data.success) {
        toast.success("Product Deleted");
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(reportedProducts);

  if (isLoading) {
    return <SppinerBackground />;
  }

  return (
    <div className="my-8 flex  items-center flex-col">
      <div>
        <h1 className="text-center text-3xl font-bold">Reported Products</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table mt-12 w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts?.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>{product?.name}</td>

                  <td>
                    <button
                      onClick={() => deleteHandler(product)}
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

export default ReportedProducts;
