import React from "react";
import HeaderIndex from ".";

const JobSearchResults = ({ searchTitle, searchResults }) => {
  console.log(searchTitle);
  return (
    <HeaderIndex>
      <h1 className="text-white text-[2rem] font-semibold">{searchTitle}</h1>
      <p className="text-[#ffffff96]">{searchResults} Search Results Found</p>
    </HeaderIndex>
  );
};

export default JobSearchResults;
