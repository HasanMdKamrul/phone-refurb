import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { getAdvertiseProducts } from "../../../Apis/productsApi";
import bannerAnimation from "../../../assets/Animation/BannerAnimation.json";
import { AuthContext } from "../../../contexts/AuthProvider";
import UseRole from "../../../Hooke/useRole";
import BuyerRoute from "../../../Routes/BuyerRoute/BuyerRoute";
import BookingModal from "../../Shared/BookingModal/BookingModal";
import Sppiner from "../../Shared/Sppiners/Sppiner";
import AdvertiseProducts from "../AdvertiseProducts/AdvertiseProducts";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";

const Home = () => {
  // ** get advertise products

  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const { role } = UseRole(user?.email);

  const { data: advertiseProducts = [], isLoading } = useQuery({
    queryKey: ["advertiseproducts", "advertise"],
    queryFn: async () => {
      try {
        const data = await getAdvertiseProducts();
        const products = data.filter((pro) => !pro.paid);
        // console.log(products);
        return products;
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

  if (isLoading) {
    return <Sppiner />;
  }

  // console.log("add", advertiseProducts);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-1/2">
          <Banner />
        </div>
        <div className="w-1/2">
          <Lottie animationData={bannerAnimation} />
        </div>
      </div>

      {advertiseProducts.length > 0 && (
        <div>
          <div className="mt-12">
            <h1 className="text-center text-4xl my-5 font-extrabold">
              Featured Products
            </h1>
          </div>
          {role && role === "buyer" && (
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advertiseProducts?.map((product) => (
                <BuyerRoute key={product._id}>
                  <AdvertiseProducts
                    handleModal={handleModal}
                    product={product}
                  />
                </BuyerRoute>
              ))}
            </div>
          )}
          {product && (
            <BookingModal product={product} setProduct={setProduct} />
          )}
        </div>
      )}
      <Categories />
    </div>
  );
};

export default Home;
