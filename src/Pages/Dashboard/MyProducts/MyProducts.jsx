import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSellerProducts,
  productAdvertiseOrReported,
} from "../../../Apis/productsApi";
import { AuthContext } from "../../../contexts/AuthProvider";
import UseRole from "../../../Hooke/useRole";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  //   const { loadingRole } = useContext(UserRoleContext);
  const { loadingRole, role } = UseRole(user?.email);

  const [loading, setLoading] = useState(false);

  const [unsold, setUnsold] = useState(true);

  const navigate = useNavigate();

  // ** Load all products by this seller

  //   console.log(user?.email);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      try {
        const data = await getSellerProducts(user?.email);
        // console.log(data);
        return data?.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  //   console.log("refech", products);

  const advertiseHandle = async (product) => {
    console.log(product);
    // ** Update product data as advertise true and save in the db
    product.advertise = "advertise";

    // ** update product

    try {
      setLoading(true);
      const data = await productAdvertiseOrReported(product);
      console.log(data);
      setLoading(false);
      if (data.success) {
        refetch();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading || loadingRole || loading) {
    return <Sppiner />;
  }

  //   console.log("products", products);

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold mb-5">My Products</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Product Status</th>
                <th>Advertise</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 mask mask-squircle">
                        <img src={product?.productImage} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product?.name}</td>
                  <td>{product?.sellingprice}</td>
                  <td>Status : {unsold ? "Avaiable/Unsold" : "Sold"} </td>
                  <td>
                    <button
                      onClick={() => advertiseHandle(product)}
                      className="btn btn-ghost"
                    >
                      Advertise
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

export default MyProducts;
