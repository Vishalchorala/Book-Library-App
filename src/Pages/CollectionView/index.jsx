import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  removeBookFromCollection,
  removeCollection,
} from "../../utils/collectionSlice";
import { Trash2, MoreHorizontal, ArrowRightCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CollectionView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState("");
  const [activeCollection, setActiveCollection] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const dispatch = useDispatch();

  const collections = useSelector((state) => state.collections.collections);
  const books = useSelector((state) => state.books.books);

  const handleInputChange = (e) => setItem(e.target.value);

  const handleAddCollection = () => {
    if (!item.trim()) {
      toast.error("Please enter a collection name before adding.");
      return;
    }

    const collectionExists = collections.some(
      (col) => col.name.toLowerCase() === item.trim().toLowerCase()
    );

    if (collectionExists) {
      toast.error("This collection already exists. Try a different name.");
    } else {
      dispatch(
        createCollection({
          id: Date.now(),
          name: item.trim(),
          bookIds: [],
        })
      );
      setItem("");
      toast.success("New collection created!");
    }
  };

  const handleCollectionClick = (id) => {
    setActiveCollection(id === activeCollection ? null : id);
  };

  const handleRemoveBook = (bookId) => {
    if (activeCollection) {
      dispatch(
        removeBookFromCollection({ collectionId: activeCollection, bookId })
      );
      toast.success("Book removed from collection.");
    }
  };

  const handleRemoveCollection = (collectionId) => {
    dispatch(removeCollection(collectionId));
    toast.success("Collection deleted successfully.");
    if (collectionId === activeCollection) setActiveCollection(null);
  };

  const selectedCollection = collections.find(
    (col) => col.id === activeCollection
  );

  const selectedBooks = selectedCollection
    ? books.filter((book) => selectedCollection.bookIds?.includes(book.index))
    : [];

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className="px-4 sm:px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <h1 className="font-semibold text-2xl sm:text-3xl mb-6 text-center">
        Book Collections
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <input
          type="text"
          value={item}
          onChange={handleInputChange}
          placeholder="Enter collection name..."
          className="w-full sm:w-100 p-2 border-2 border-black outline-none"
        />
        <button
          onClick={handleAddCollection}
          className="bg-black text-white p-2 hover:opacity-90 cursor-pointer w-full sm:w-auto"
        >
          Add Collection
        </button>
      </div>

      <div className="mt-15">
        <h2 className="text-2xl sm:text-3xl text-center md:text-left font-semibold text-black mb-4 sm:mb-8">
          Your Book Collections:
        </h2>

        <div className="flex flex-wrap gap-6">
          {collections.length === 0 ? (
            <p className="text-gray-600 text-center mx-auto text-md sm:text-xl pt-5 px-4 sm:px-0 italic">
              No collections available. Add a new one collection.
            </p>
          ) : (
            collections.map((col) => (
              <div
                key={col.id}
                onClick={() => handleCollectionClick(col.id)}
                className={`relative mx-2 px-6 py-4 rounded-md shadow-sm transition-all duration-300 w-50 cursor-pointer backdrop-blur-md border mb-4 mt-4 sm:mt-0 ${col.id === activeCollection
                  ? "bg-black text-white border-black scale-105"
                  : "bg-white text-black border-gray-300"
                  }`}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpenId(
                      dropdownOpenId === col.id ? null : col.id
                    );
                  }}
                  className={`absolute top-3 right-3 rounded-full p-1 transition-colors duration-200 ${col.id === activeCollection
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-black hover:bg-gray-200"
                    }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>

                {dropdownOpenId === col.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute z-20 top-10 right-1 bg-white border border-gray-300 rounded-md shadow-lg animate-fadeIn"
                  >
                    <button
                      onClick={() => {
                        handleRemoveCollection(col.id);
                        setDropdownOpenId(null);
                      }}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full cursor-pointer"
                    >
                      Delete Collection
                    </button>
                  </div>
                )}

                <div className="text-xl font-semibold">{col.name}</div>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  {col.bookIds.length} books
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {activeCollection && (
        <div className="mt-6 px-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
            Books in{" "}
            <span className="text-blue-800 font-bold">
              "{selectedCollection.name}"
            </span>
          </h2>
          {selectedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-4">
              {selectedBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-4 border-2 border-gray-500 w-80 sm:w-full shadow-sm h-auto mx-auto transform transition-transform duration-300 hover:scale-102 mt-6"
                >
                  <img
                    src={book.cover || book.img}
                    alt={`Cover image of the book: ${book.title}`}
                    className="w-full h-90"
                  />
                  <h3 className="font-semibold text-xl mt-3">{book.title}</h3>
                  <div className="flex gap-2 items-center mt-3">
                    Pages:
                    <p className="text-gray-500 font-medium text-sm">
                      {book.pages}
                    </p>
                  </div>
                  {book.isCustom && (
                    <>
                      <div className="flex gap-2 items-center mt-2">
                        Author :
                        <p className="text-gray-500 font-medium text-sm">
                          {book.author}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center mt-2">
                        Category :
                        <p className="text-gray-500 font-medium text-sm">
                          {book.category}
                        </p>
                      </div>
                    </>
                  )}
                  <p className="text-sm line-clamp-4 mt-2">{book.description}</p>
                  <p className="text-sm font-medium mt-2 text-orange-500">
                    {book.releaseDate}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleRemoveBook(book.index)}
                      className="px-3 py-2 bg-red-500 text-white text-xs hover:bg-red-600 w-full flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Book
                    </button>
                    <button
                      onClick={() => openModal(book)}
                      className="px-3 py-2 bg-black text-white text-xs hover:bg-gray-800 w-full flex items-center justify-center gap-1 cursor-pointer"
                    >
                      View details{" "}
                      <ArrowRightCircle className="inline w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-md md:text-xl italic mt-10 text-center">
              No books in this collection yet.
            </p>
          )}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col my-auto md:flex-row items-center md:items-start"
          >
            <img
              src={selectedBook.cover || selectedBook.img}
              alt="book_image"
              className="w-50 md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-5 object-contain"
            />

            <div className="w-full md:w-1/2 my-auto">
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                {selectedBook.title}
              </h2>
              <p className="text-sm mb-4">{selectedBook.description}</p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Pages:</span>{" "}
                {selectedBook.pages}
              </p>
              {selectedBook.isCustom && (
                <>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Author:</span>{" "}
                    {selectedBook.author}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {selectedBook.category}
                  </p>
                </>
              )}
              <p className="text-sm mb-4">
                <span className="font-semibold">Release Date:</span>{" "}
                {selectedBook.releaseDate}
              </p>
              <button
                onClick={closeModal}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CollectionView;
