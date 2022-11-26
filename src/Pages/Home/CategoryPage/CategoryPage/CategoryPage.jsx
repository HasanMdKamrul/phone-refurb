import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BookingModal from "../../../Shared/BookingModal/BookingModal";
import Sppiner from "../../../Shared/Sppiners/Sppiner";
import ProductCard from "../ProductCard/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);

  const categoryName = location?.state?.categoryName;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/products/${id}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        // console.log(data.data);
        return data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const handleModal = (product) => {
    setProduct(product);
  };

  if (isLoading) {
    return <Sppiner />;
  }

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center mt-12">{categoryName}</h1>
      </div>
      <div>
        {products?.map((product) => (
          <ProductCard
            handleModal={handleModal}
            key={product._id}
            product={product}
          />
        ))}
      </div>
      {product && <BookingModal setProduct={setProduct} product={product} />}
    </div>
  );
};

export default CategoryPage;
