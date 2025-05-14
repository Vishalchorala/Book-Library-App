import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../constant/menuItems";

const Error = () => {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-white text-gray-800 px-4">
      <section className="w-full max-w-5xl mx-auto rounded-2xl shadow-sm overflow-hidden flex flex-col md:grid md:grid-cols-2">
        <div className="flex items-center justify-center bg-gray-100 p-6 sm:p-10 order-1 md:order-none">
          <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] leading-none font-extrabold text-red-300">
            404
          </h1>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 bg-gray-50 order-2 md:order-none">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Oops! Page not found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link to={paths.home}>
            <button className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition duration-300 cursor-pointer">
              Go Back to Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Error;
