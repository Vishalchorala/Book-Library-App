import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-50 flex flex-col px-5 py-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-y-2.5">
        <h2 className="text-black text-2xl sm:text-3xl font-sans text-center md:text-left flex items-center gap-2">
          <BookOpen className="w-6 h-6 mt-1" />
          Book Library
        </h2>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Book Library App. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
};

export default Footer;
