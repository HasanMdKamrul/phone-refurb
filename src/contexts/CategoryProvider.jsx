import React, { createContext, useEffect, useState } from "react";
import { loadCategories } from "../Apis/loadCategories";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setisCategoryLoading] = useState(false);

  // ** Load categories data here

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setisCategoryLoading(true);
        const data = await loadCategories();
        setCategories(data);
        setisCategoryLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategoryData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, isCategoryLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
