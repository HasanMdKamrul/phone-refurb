import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../Shared/CategoryCard/CategoryCard";

const Categories = () => {
  // const { categories, isCategoryLoading } = useContext(CategoryContext);

  const [categories, setCategories] = useState([]);

  // if (isCategoryLoading) {
  //   return <Sppiner />;
  // }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/categories`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="py-12">
      <div>
        <h1 className="text-4xl text-center font-extrabold mb-12">
          Discover Our Categories
        </h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories?.map((category) => (
          <CategoryCard category={category} key={category?._id} />
        ))}
      </section>
    </div>
  );
};

export default Categories;
