import React from "react";
const MaywaButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg uppercase font-bold transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MaywaButton;
