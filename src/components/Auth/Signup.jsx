import React from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const signupSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters.",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Enter a valid email.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:'\",.<>/?]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
      "string.empty": "Password is required.",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Confirm Password is required.",
  }),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (checkError === null && existingUser) {
      setError("email", { message: "Email is already registered." });
      toast.error("Email is already registered.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: data.username },
      },
    });

    if (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Signup failed");
    } else {
      toast.success("Signup successful! Please check your email to verify.");
      setTimeout(() => navigate(paths.login), 1500);
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
        className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2 text-purple-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <UserPlus className="w-6 h-6" />
        Sign Up
      </motion.h2>

      {errors.root && (
        <motion.p
          className="text-red-500 mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {errors.root.message}
        </motion.p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
        )}

        <motion.input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <motion.input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <motion.input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className="w-full p-1 sm:p-2 mb-2 px-2 sm:border-gray-800 border border-gray-300 rounded text-sm sm:text-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {errors.confirmPassword.message}
          </p>
        )}

        <motion.button
          type="submit"
          className="w-full font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white py-2 mt-2 rounded hover:bg-green-700 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sign Up
        </motion.button>

        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Already have an account?{" "}
          <Link to={paths.login} className="text-blue-600 underline">
            Log In
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Signup;
