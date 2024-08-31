import React from "react";
import { Button } from "../ui/button";
import PatternOne from "../../../public/patternOne.png";
import HeaderIndex from ".";
import { useJob } from "../../contexts/jobContext";

const HomeHeader = () => {
  const { getSearchResults } = useJob();
  const handleSearchText = (e) => {
    const searchText = e.target.value;
    getSearchResults(searchText);
  };
  return (
    <>
      <HeaderIndex>
        <h1 className="text-white text-[2rem] md:text-[2.3rem] font-medium">
          Find your dream job with <span className="text-text-orange">ease.</span>
        </h1>
        <form className="mt-[.9rem]">
          <div className="w-full flex bg-[#f8f8f8] p-1 pl-[2rem] rounded-full items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-text"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              onChange={handleSearchText}
              className="flex-1 outline-none font-light border-l pl-3 bg-transparent"
              placeholder="Enter a Job Title"
            />
            <Button className="rounded-full px-[4rem] bg-black py-[1.5rem]">Find Jobs</Button>
          </div>
        </form>
      </HeaderIndex>
    </>
  );
};

export default HomeHeader;
