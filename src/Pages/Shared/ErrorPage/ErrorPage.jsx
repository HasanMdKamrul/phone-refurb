import Lottie from "lottie-react";
import React from "react";
import { MdHome } from "react-icons/md";
import { Link, useRouteError } from "react-router-dom";
import errorAnimation from "../../../assets/Animation/ErrorAnimation.json";

const ErrorPage = () => {
  const { status, statusText, message } = useRouteError();
  const error = useRouteError();

  return (
    <div>
      {error && (
        <section className="flex items-center h-full p-16">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
              <h2 className="mb-8 font-extrabold text-9xl">
                <span className="sr-only">Error</span>
                <Lottie animationData={errorAnimation} />
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                Sorry, we couldn't find this page.{" "}
                <span className="text-red-200"> {statusText || message}</span>{" "}
              </p>
              <p className="mt-4 mb-8 dark:text-gray-400">{status}</p>
              <div className="mt-5 flex justify-center">
                <Link
                  rel="noopener noreferrer"
                  to="/"
                  className="px-8 py-3 font-semibold rounded bg-sky-400 text-white flex"
                >
                  <MdHome className="w-6 h-6 mr-2" />
                  Back to homepage
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ErrorPage;
