import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Contact } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed. Please try again.");
    } else {
      setTimeout(() => {
        navigate(paths.login);
      }, 3000);
      toast.success("Logged out successfully!");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-white text-black">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full m-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl mx-auto mt-10 p-10 bg-gray-50 shadow-xl border border-gray-300 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center flex items-center justify-center gap-2">
          <Contact className="w-6 h-6" />
          Your Profile
        </h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Username :</strong> {user.user_metadata?.username || "Not set"}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
        >
          Log out
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
