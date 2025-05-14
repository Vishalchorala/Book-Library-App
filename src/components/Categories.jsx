import React from "react";
import Tabbutton from "./Tabbutton";
import { motion } from "framer-motion";

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const categories = ["Science", "Fiction", "Non-Fiction", "Fantasy", "Crime"];

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="md:mt-10 mt-8 bg-white flex flex-col justify-center items-center mb-6"
    >
      <h2 className="font-medium text-2xl sm:text-3xl mb-5 text-center">
        Categories Books
      </h2>

      <motion.div
        className="flex flex-wrap gap-4 px-6 py-4 w-full md:w-fit rounded-md justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Tabbutton
              onClick={() => handleCategoryClick(cat)}
              isActive={selectedCategory === cat}
            >
              {cat}
            </Tabbutton>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Categories;
