import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAdvertiseProducts } from "../../../Apis/productsApi";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import AdvertiseProducts from "../AdvertiseProducts/AdvertiseProducts";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  // ** get advertise products

  const [product, setProduct] = useState(null);

  const { data: advertiseProducts = [] } = useQuery({
    queryKey: ["advertiseproducts", "advertise"],
    queryFn: async () => {
      try {
        const data = await getAdvertiseProducts();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  //   console.log(advertiseProducts);

  const handleModal = (product) => {
    console.log(product);
    setProduct(product);
  };

  return (
    <div>
      <Banner />
      <Categories />
      {advertiseProducts.length > 0 && (
        <div>
          <div>
            <h1 className="text-center text-4xl my-5 font-extrabold">
              Featured Products
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advertiseProducts?.map((product) => (
              <AdvertiseProducts
                handleModal={handleModal}
                key={product._id}
                product={product}
              />
            ))}
          </div>
          {product && (
            <BookingModal product={product} setProduct={setProduct} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
