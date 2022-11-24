import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { CategoryContext } from "../../../contexts/CategoryProvider";

const conditionInfo = ["Excellent", "Good", "Fair"];

const AddAProduct = () => {
  const { categories } = useContext(CategoryContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const image = form.image.files;
    const purchaseprice = form.purchaseprice.value;
    const sellingprice = form.sellingprice.value;
    const productCategoryId = form.productCategory.value;
    const condition = form.condition.value;
    const usagetime = form.usagetime.value;
    const mobile = form.mobile.value;
    const purchaseyear = form.purchaseyear.value;
    const description = form.description.value;
    console.log(
      name,
      image,
      purchaseprice,
      sellingprice,
      productCategoryId,
      condition,
      usagetime,
      mobile,
      purchaseyear,
      description
    );

    const bookingInfo = {
      name,
      image,
      purchaseprice,
      sellingprice,
      productCategoryId,
      condition,
      usagetime,
      mobile,
      purchaseyear,
      description,
    };
  };

  //   console.log(format(new Date(), "Pp"));

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto mt-12 rounded-md shadow-md bg-gray-500">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Account settings
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="productname"
              >
                Name
              </label>
              <input
                required
                name="name"
                id="productname"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="price"
              >
                Purchase Price
              </label>
              <input
                required
                name="purchaseprice"
                id="price"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="price"
              >
                Selling Price
              </label>
              <input
                required
                name="sellingprice"
                id="price"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="category"
              >
                Category
              </label>
              <select
                required
                name="productCategory"
                className="select select-bordered w-full "
              >
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="category"
              >
                Condition
              </label>
              <select
                required
                name="condition"
                className="select select-bordered w-full "
              >
                {conditionInfo.map((condition, i) => (
                  <option value={condition} key={i}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="location"
              >
                location
              </label>
              <input
                required
                name="location"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="usagetime"
              >
                Usage time
              </label>
              <input
                required
                name="usagetime"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="mobile"
              >
                Mobile No
              </label>
              <input
                required
                name="mobile"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="purchaseyear"
              >
                Purchase Year
              </label>
              <input
                required
                name="purchaseyear"
                type="year"
                placeholder="DD/MM/YY"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                required
                name="description"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAProduct;
