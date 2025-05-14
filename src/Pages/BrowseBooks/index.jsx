import React, { useState } from "react";
import Categories from "../../components/Categories";
import Searchfield from "../../components/Searchfield";
import BooksData from "../../components/BooksData";
import { motion } from "framer-motion";

const BrowseBooks = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-2">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Searchfield onSearch={setInputValue} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BooksData
            title="All Books"
            inputValue={inputValue}
            selectedCategory={selectedCategory}
          />
        </motion.div>
      </section>
    </div>
  );
};

export default BrowseBooks;
