import React from "react";
import HeaderIndex from ".";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const CVHeader = ({ isPreview }) => {
  return (
    <HeaderIndex>
      <Link className="bg-[#ffffff38] flex items-center gap-2 text-[#A0A0A0] py-2 px-5 w-fit hover:text-[#fff] transition-all rounded-[10px] font-normal">
        <MoveLeft />
        View Jobs Openings
      </Link>
      <h1 className="text-white text-[2rem] max-w-[400px] mt-[.6rem] font-semibold leading-[1.4]">
        {isPreview ? "Preview You Cv before Sending" : "Lets make the application easier"}
      </h1>
    </HeaderIndex>
  );
};

export default CVHeader;
