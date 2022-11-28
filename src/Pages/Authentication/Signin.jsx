import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveUserAndTokenGenerate } from "../../Apis/userApiAndToken";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../Hooks/useToken";
import SppinerBackground from "../Shared/Sppiners/SppinerBackground";

const Signin = () => {
  //   const [resetEmail, setResetEmail] = useState("");
  const { providerLogin, setLoading, loading, logIn, resetPassword } =
    useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  const from = location.state?.from?.pathname || "/dashboard";

  if (token) {
    navigate(from, { replace: true });
  }

  const googleLoginHandler = async () => {
    try {
      const result = await providerLogin(googleProvider);
      saveUserAndTokenGenerate(result.user);
      // generateJwt(result?.user?.email);
      setLoginUserEmail(result.user.email);
      // navigate(from, { replace: true });
      toast.success("Login with google successful...");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logInHandle = async (event) => {
    try {
      event.preventDefault();

      const form = event.target;
      const email = form.email.value;

      const password = form.password.value;
      const result = await logIn(email, password);
      setLoginUserEmail(result.user.email);

      console.log(result);

      // generateJwt(result?.user?.email);

      toast.success("User Login Successful...");
      console.log(result.user);
      // navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //   const passwordResetHandle = async () => {
  //     try {
  //       await resetPassword(resetEmail);
  //       toast.success(
  //         "Password reset email has been sent, please check your email"
  //       );
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   };

  if (loading) {
    return <SppinerBackground />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-md shadow-md bg-gray-500">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Phone-Refurb
        </h1>

        <form onSubmit={logInHandle} className="mt-6">
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
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
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

        <div className="flex items-center justify-center mt-6 -mx-2">
          <button className="btn w-full" onClick={googleLoginHandler}>
            <FaGoogle className="mr-2" />
            Google
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
