import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../utils/bookSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddBooks = () => {
  const [error, setError] = useState("");
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    imageUrl: "",
    description: "",
    pages: "",
    releaseDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      author,
      imageUrl,
      description,
      category,
      pages,
      releaseDate,
    } = bookData;

    if (
      !title ||
      !author ||
      !imageUrl ||
      !description ||
      !category ||
      !pages ||
      !releaseDate
    ) {
      setError("Please ensure all fields are filled");
      return;
    }

    const newBook = {
      id: Date.now(),
      index: Date.now(),
      title,
      author,
      category,
      description,
      img: imageUrl,
      pages,
      releaseDate,
      isNew: true,
      isCustom: true,
    };

    dispatch(addBook(newBook));
    toast.success("Book added successfully!");
    navigate("/browsebooks");
  };

  return (
    <motion.form
      className="lg:w-1/2 w-full p-12 mx-auto"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-center">
        Add New Book
      </h2>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Book Category
        </label>
        <select
          name="category"
          value={bookData.category}
          onChange={handleChange}
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        >
          <option value="">Select Category</option>
          <option value="Science">Science</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantacy">Fantacy</option>
          <option value="Crime">Crime</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          placeholder="Enter book description"
          className="w-full pl-2 pr-5 border-2 border-black outline-none"
          rows="5"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Pages
        </label>
        <input
          type="number"
          name="pages"
          value={bookData.pages}
          onChange={handleChange}
          placeholder="Enter number of pages"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Release Date
        </label>
        <input
          type="date"
          name="releaseDate"
          value={bookData.releaseDate}
          onChange={handleChange}
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-lg text-gray-600 mb-1">
          Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          value={bookData.imageUrl}
          onChange={handleChange}
          placeholder="Paste image URL here"
          className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
        />
      </div>

      {error && (
        <motion.p
          className="font-medium text-red-500 text-base mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        className="px-6 py-2 w-full bg-black text-white font-semibold hover:bg-gray-800 mt-2 transition-all duration-300 cursor-pointer"
      >
        Add Book
      </button>
    </motion.form>
  );
};

export default AddBooks;
