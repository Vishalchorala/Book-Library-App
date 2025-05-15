import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Enter a valid email.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "string.empty": "Password is required.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Login failed");
    } else {
      toast.success("Login successful!");
      setTimeout(() => navigate(paths.home), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-md mx-auto mt-4 sm:mt-10 sm:p-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg"
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2 text-blue-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <LogIn className="w-6 h-6" />
        Log In
      </motion.h2>

      {/* {errors.root && (
        <p className="text-red-500 mb-4">{errors.root.message}</p>
      )} */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          />
          {passwordValue.length > 0 && (
            <span
              className="absolute right-2 top-1.5 sm:top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          )}
        </motion.div>


        <motion.button
          type="submit"
          className="w-full font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white py-2 mt-2 rounded hover:bg-blue-700 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Log In
        </motion.button>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account?{" "}
          <Link to={paths.signup} className="text-blue-600 underline">
            Sign up
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Login;
