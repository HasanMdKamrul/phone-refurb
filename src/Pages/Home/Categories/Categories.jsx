import React, { useEffect, useState } from "react";
import { loadCategories } from "../../../Apis/loadCategories";
import CategoryCard from "../../Shared/CategoryCard/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // ** Load categories data here

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const data = await loadCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategoryData();
  }, []);

  return (
    <div className="  mx-24 py-12">
      <div>
        <h1 className="text-4xl text-center font-extrabold mb-12">
          Discover Our Categories
        </h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((caterory) => (
          <CategoryCard caterory={caterory} key={caterory?._id} />
        ))}
      </section>
    </div>
  );
};

export default Categories;
