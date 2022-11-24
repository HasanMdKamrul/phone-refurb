import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getSellerProducts } from "../../../Apis/productsApi";
import { AuthContext } from "../../../contexts/AuthProvider";
import UseRole from "../../../Hooke/useRole";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  //   const { loadingRole } = useContext(UserRoleContext);
  const { loadingRole, role } = UseRole(user?.email);

  // ** Load all products by this seller

  console.log(user?.email);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      try {
        const data = await getSellerProducts(user?.email);
        console.log(data);
        return data?.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading || loadingRole) {
    return <Sppiner />;
  }

  console.log("products", products);

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
                  <td>Status : </td>
                  <td>
                    <button className="btn btn-ghost">Advertise</button>
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
