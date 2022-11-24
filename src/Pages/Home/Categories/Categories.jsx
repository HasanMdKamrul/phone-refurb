import React, { useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import CategoryCard from "../../Shared/CategoryCard/CategoryCard";
import Sppiner from "../../Shared/Sppiners/Sppiner";

const Categories = () => {
  const { categories, isCategoryLoading } = useContext(CategoryContext);

  return (
    <>
      <div className="  mx-24 py-12">
        <div>
          <h1 className="text-4xl text-center font-extrabold mb-12">
            Discover Our Categories
          </h1>
        </div>
        {isCategoryLoading ? (
          <Sppiner />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((caterory) => (
              <CategoryCard caterory={caterory} key={caterory?._id} />
            ))}
          </section>
        )}
      </div>
    </>
  );
};

export default Categories;
