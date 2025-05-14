import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BooksCard from "./BooksCard";
import { motion, AnimatePresence } from "framer-motion";

const BooksData = ({
  title,
  inputValue = "",
  handleSearchTxt,
  selectedCategory,
}) => {
  const { books, loading, error } = useSelector((state) => state.books);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white text-black ">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center py-30 px-5 sm:px-6 lg:px-8">
        <div className="bg-white text-red-600 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
              />
            </svg>
            Error
          </h1>
          <p className="text-base sm:text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const searchText = handleSearchTxt ? handleSearchTxt() : inputValue;

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true;
    const matchesSearch =
      (book.title &&
        book.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (book.author &&
        book.author.toLowerCase().includes(searchText.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const isCategoryEmpty = selectedCategory && filteredBooks.length === 0;
  const isSearchEmpty = !selectedCategory && filteredBooks.length === 0;

  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-5 py-8">
        <h2 className="font-medium text-2xl sm:text-3xl">
          {title || "Popular Books"}
        </h2>
        {!title && (
          <Link to="/browsebooks">
            <p className="text-black font-normal text-sm sm:text-base underline underline-offset-2">
              View more
            </p>
          </Link>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-5 mb-8">
        {filteredBooks.length === 0 ? (
          <div className="text-center">
            <h3 className="text-lg text-gray-600 italic py-40">
              {isCategoryEmpty
                ? "No books found in this category."
                : isSearchEmpty
                ? "No books found matching your search."
                : "No books found matching your search or selected category."}
            </h3>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimatePresence>
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BooksCard book={book} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default BooksData;
