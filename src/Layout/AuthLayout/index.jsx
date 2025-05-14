import React from "react";
import { Outlet } from "react-router-dom";
import GuestRoute from "../../Route/GuestRoute";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <GuestRoute>
      <div className="h-dvh flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 px-4 sm:px-4 py-6">
        <motion.div
          className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Left Panel - Welcome Text & Image */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 sm:p-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-0 sm:mb-3">
                Welcome to Book Library
              </h2>
              <p className="text-sm sm:text-base md:text-lg px-5">
                Discover, organize, and manage your books with ease.
              </p>
            </motion.div>
            <motion.img
              src="https://illustrations.popsy.co/gray/web-design.svg"
              alt="Library Illustration"
              className="w-30 sm:w-60 md:w-72 mt-0 sm:mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </div>

          {/* Right Panel - Form */}
          <div className="p-3 pb-7 sm:p-6 md:p-10 bg-gradient-to-br from-blue-100 to-purple-200">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-4 sm:mb-6 text-center"
            >
              <h1 className="hidden sm:block text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-blue-700">
                Book Library App
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2 font-bold">
                Please log in or sign up to continue
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </GuestRoute>
  );
};

export default AuthLayout;  
