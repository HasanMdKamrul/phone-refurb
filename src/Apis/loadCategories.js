import axios from "axios";

export const loadCategories = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/categories`);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
