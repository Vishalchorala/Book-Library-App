import React from "react";

const Searchfield = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-5 sm:mb-10 px-2.5 sm:px-4">
      <input
        type="text"
        placeholder="Search by Book name or Author"
        className="pl-4 pr-7 w-full sm:w-3/4 md:w-1/2 h-14 outline-none border-2 border-gray-800 "
        onChange={handleChange}
      />
    </div>
  );
};

export default Searchfield;