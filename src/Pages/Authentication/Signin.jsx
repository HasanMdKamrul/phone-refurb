import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Signin = () => {
  //   const [resetEmail, setResetEmail] = useState("");
  const { providerLogin, setLoading, loading, logIn, resetPassword } =
    useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const googleLoginHandler = async () => {
    try {
      const result = await providerLogin(googleProvider);
      //   saveUserAndTokenGenerate(result.user);
      navigate(from, { replace: true });
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
      //   saveUserAndTokenGenerate(result.user);
      toast.success("User Login Successful...");
      console.log(result.user);
      navigate(from, { replace: true });
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
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div class="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-md shadow-md bg-gray-500">
        <h1 class="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Phone-Refurb
        </h1>

        <form onClick={logInHandle} class="mt-6">
          <div>
            <label
              for="Email"
              class="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              name="email"
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <input
              name="password"
              type="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div class="mt-6">
            <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

          <p class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with Social Media
          </p>

          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <div class="flex items-center mt-6 -mx-2">
          <button
            type="button"
            class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>

            <span onClick={googleLoginHandler} class="hidden mx-2 sm:inline">
              Sign in with Google
            </span>
          </button>
        </div>

        <p class="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/signup"
            class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
