import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  generateJwt,
  saveUserAndTokenGenerate,
} from "../../Apis/userApiAndToken";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {
  const googleProvider = new GoogleAuthProvider();
  const {
    register,
    userProfileUpdate,
    emailVerify,
    providerLogin,
    setLoading,
    loading,
  } = useContext(AuthContext);
  const [Image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const role = form.role.value;
    console.log(role);

    const getImageUrl = (image) => {
      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_image_key}`;

      const loadImage = async () => {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });

          const {
            data: { display_url },
          } = await response.json();
          try {
            const result = await register(email, password);
            // console.log(result.user);
            saveUserAndTokenGenerate(result.user, role);
            generateJwt(result?.user?.email);
            await userProfileUpdate({
              displayName: name,
              photoURL: display_url,
            });
            await emailVerify();
            navigate("/");
            toast.success(`User has created`);
          } catch (error) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

      loadImage();
    };

    getImageUrl(image);
  };

  const googleLoginHandler = async () => {
    try {
      const result = await providerLogin(googleProvider);
      saveUserAndTokenGenerate(result.user);
      generateJwt(result?.user?.email);
      navigate("/");
      toast.success("Login with google successful...");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-gray-500 rounded-md shadow-md ">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Name
            </label>
            <input
              required
              name="name"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="name"
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

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <input
              name="password"
              type="password"
              placeholder="*********"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="Select Account Type"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Select Account Type
              </label>
            </div>

            <select name="role" className="select select-bordered w-full ">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

          <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with Social Media
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>

            <span
              onClick={googleLoginHandler}
              className="hidden mx-2 sm:inline"
            >
              Sign in with Google
            </span>
          </button>
        </div>

        <Link
          to="/signin"
          className="mt-8 text-xs font-light text-center text-gray-400"
        >
          {" "}
          Already have an account?{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
            Signin
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
