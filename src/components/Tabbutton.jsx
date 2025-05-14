import React from "react";
import { Link } from "react-router-dom";

const Tabbutton = ({ children, to, onClick, isActive }) => {
  return (
    <Link to={to}>
      <button
        onClick={onClick}
        className={`${
          isActive ? "bg-[#4a6da7] text-white" : "bg-black text-white"
        } hover:bg-[#4a6da7] font-normal text-base px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer `}
        role="button"
      >
        {children}
      </button>
    </Link>
  );
};

export default Tabbutton;
