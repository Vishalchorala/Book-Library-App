import React, { useState } from "react";
import { TiArrowForward } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdBookmarkAdd, MdMoreVert } from "react-icons/md";
import { addBookToCollection } from "../utils/collectionSlice";
import toast from "react-hot-toast";
import { deleteCustomBook } from "../utils/bookSlice";
import { paths } from "../constant/menuItems";

const BooksCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const collections = useSelector((state) => state.collections.collections);
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCollectionModal = () => setIsCollectionModalOpen(true);
  const closeCollectionModal = () => setIsCollectionModalOpen(false);

  const handleCheckboxChange = (name) => {
    setSelectedCollections((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleAddToCollections = () => {
    if (selectedCollections.length === 0) {
      toast.error("Please select at least one collection.");
      return;
    }

    let isAlreadyAdded = false;

    selectedCollections.forEach((collectionId) => {
      const collection = collections.find(
        (collection) => collection.id === collectionId
      );

      if (collection && collection.bookIds.includes(book.index)) {
        isAlreadyAdded = true;
      } else {
        dispatch(addBookToCollection({ collectionId, bookId: book.index }));
      }
    });

    if (isAlreadyAdded) {
      toast.error(
        "This book is already added to one of the selected collections."
      );
    } else {
      toast.success("Book added to selected collections!");
    }

    setSelectedCollections([]);
    closeCollectionModal();
  };

  const handleDeleteBook = () => {
    if (book.isCustom) {
      dispatch(deleteCustomBook(book.id));
      toast.success("Custom book deleted!");
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className="p-3 border-2 border-gray-500 w-75 sm:w-full shadow-sm h-auto mx-auto transform transition-transform duration-300 hover:scale-102 relative "
        key={book.id}
      >
        {(book.isNew || book.isCustom) && (
          <div className="flex justify-between items-center mb-2">
            {book.isNew && (
              <p className="bg-black text-white text-xs px-2 py-1.5 w-fit">
                Newly Added
              </p>
            )}

            {book.isCustom && (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-black p-1.5 hover:bg-gray-200 rounded-full"
                  aria-label="Options"
                >
                  <MdMoreVert className="w-5 h-5" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 right-0 bg-white border border-gray-300 rounded-md shadow-lg animate-fadeIn">
                    <button
                      onClick={handleDeleteBook}
                      className="px-4 py-2 text-md text-red-600 hover:bg-red-50 rounded-md w-full cursor-pointer"
                      aria-label="Delete Book"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <img
          src={book.cover || book.img}
          alt={`Cover image of the book: ${book.title}`}
          className="w-full h-90"
        />
        <h3 className="font-semibold text-xl mt-3">{book.title}</h3>
        <div className="flex gap-2 items-center mt-3 ">
          Pages:
          <p className="text-gray-500 font-medium text-sm ">{book.pages}</p>
        </div>
        {book.isCustom && (
          <>
            <div className="flex gap-2 items-center mt-1 ">
              Author :
              <p className="text-gray-500 font-medium text-sm ">
                {book.author}
              </p>
            </div>
            <div className="flex gap-2 items-center mt-1 ">
              Category :
              <p className="text-gray-500 font-medium text-sm ">
                {book.category}
              </p>
            </div>
          </>
        )}
        <p className="text-sm line-clamp-4 mt-2">{book.description}</p>
        <p className="text-sm font-medium mt-2 text-orange-500">
          {book.releaseDate}
        </p>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-5 gap-2">
          <button
            onClick={openCollectionModal}
            className="bg-black text-white px-3 py-2 text-xs hover:bg-gray-800 cursor-pointer w-full lg:w-auto"
          >
            Add to collection <MdBookmarkAdd className="inline w-4 h-4" />
          </button>

          <Link>
            <button
              onClick={openModal}
              className="px-3 py-2 bg-black text-white text-xs cursor-pointer hover:bg-gray-800 w-full lg:w-auto"
            >
              View details <TiArrowForward className="inline w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {isCollectionModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeCollectionModal}
          role="dialog"
          aria-labelledby="collection-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <h3
              id="collection-modal-title"
              className="text-xl font-semibold mb-4"
            >
              Add to collections
            </h3>
            {collections.length === 0 ? (
              <p className="text-gray-800 italic mb-6">
                No collections available.
              </p>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                {collections.map((collection) => (
                  <label
                    key={collection.name}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={collection.id}
                      checked={selectedCollections.includes(collection.id)}
                      onChange={() => handleCheckboxChange(collection.id)}
                      className="cursor-pointer"
                    />
                    {collection.name}
                  </label>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeCollectionModal}
                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <Link to={paths.collectionview}
                className="px-4 py-1 bg-black text-white hover:bg-gray-800 cursor-pointer"
              >
                Make new Collcection
              </Link>
              <button
                onClick={handleAddToCollections}
                className="px-4 py-1 bg-black text-white hover:bg-gray-800 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-labelledby="book-details-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col my-auto md:flex-row items-center md:items-start"
          >
            <img
              src={book.cover || book.img}
              alt="book_image"
              className="w-50 md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-5 object-contain"
            />

            <div className="w-full md:w-1/2 my-auto">
              <h2
                id="book-details-modal-title"
                className="text-xl md:text-3xl font-bold mb-4"
              >
                {book.title}
              </h2>
              <p className="text-sm mb-4">{book.description}</p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Pages:</span> {book.pages}
              </p>
              {book.isCustom && (
                <>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {book.category}
                  </p>
                </>
              )}
              <p className="text-sm mb-4">
                <span className="font-semibold">Release Date:</span>{" "}
                {book.releaseDate}
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
    </>
  );
};

export default BooksCard;
