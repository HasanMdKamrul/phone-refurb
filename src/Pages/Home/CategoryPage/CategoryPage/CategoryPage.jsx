import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Sppiner from "../../../Shared/Sppiners/Sppiner";

const CategoryPage = () => {
  const { id } = useParams();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/products/${id}`
        );
        const data = await response.json();
        console.log(data.data);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) {
    return <Sppiner />;
  }

  return (
    <div>
      <h1>Category page</h1>
    </div>
  );
};

export default CategoryPage;
