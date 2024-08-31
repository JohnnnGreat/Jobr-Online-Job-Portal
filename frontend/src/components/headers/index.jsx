import React from "react";
import PatternOne from "../../../public/patternOne.png";

const HeaderIndex = ({ children }) => {
  return (
    <div className="bg-black w-full h-[200px] sm:h-[250px] md:h-[200px] lg:h-[200px] flex items-center relative overflow-hidden">
      {/* Responsive image */}
      <img
        src={PatternOne}
        alt="pattern layer"
        className="absolute right-0 top-0 opacity-50 sm:w-[100px] md:w-[200px] lg:w-[250px] xl:w-[300px] w-[30%] object-cover"
      />
      {/* Centered content */}
      <div className="max-w-[1100px] mx-auto w-full relative z-10 px-4">{children}</div>
    </div>
  );
};

export default HeaderIndex;
