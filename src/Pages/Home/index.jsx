import React, { useState } from "react";
import hero_image from "../../assets/hero_images.png";
import Categories from "../../components/Categories";
import BooksData from "../../components/BooksData";
import { motion } from "framer-motion";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[url('/bgBanner.svg')] w-full p-5 flex flex-col md:flex-row gap-10 justify-start md:justify-center items-start md:items-center"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 text-center md:text-left">
            The Ultimate Library Management Tool
          </h2>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-auto flex justify-center md:justify-start"
        >
          <img
            src={hero_image}
            alt="Hero"
            className="w-60 md:w-96 h-auto object-contain"
          />
        </motion.div>
      </motion.section>

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BooksData selectedCategory={selectedCategory} />
    </>
  );
};

export default Home;
