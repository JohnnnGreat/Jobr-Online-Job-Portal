/* eslint-disable react/no-unescaped-entities */
import JobsDisplay from "../components/JobsDisplay";
import Filter from "../components/Filter";
import HomeHeader from "../components/headers/HomeHeader";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
// import { useUser } from "../contexts/userContext";
// import { useLoaderData } from "react-router-dom";

import HomeImage from "../../public/homeIm.jpg";
import PatternRight from "../../public/rightP.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const employer = JSON.parse(localStorage.getItem("employer"));

  const [authenticationExists, setAuthenticationExists] = useState(true);

  useEffect(() => {
    setAuthenticationExists(!authenticationExists);
  }, [user, employer, authenticationExists, setAuthenticationExists]);
  return (
    <>
      {user || employer ? (
        <div className="w-full ">
          <HomeHeader />
          <div className=" h-full max-w-[1100px] rounded-lg mx-auto flex bg-[#E4E3E3] p-[1px] gap-[1px]">
            <Filter />
            <JobsDisplay />
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#FEFCF2] pt-16 relative p-3">
            {/* Image pattern on the left for larger screens */}
            <img
              src={PatternRight}
              className="hidden lg:block h-full absolute left-[-5rem] top-0"
            />
            {/* Centering the content with max width and auto margin */}
            <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center">
              <div>
                {/* Main heading with responsive text size and text alignment */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-[700px] text-center leading-tight sm:leading-snug">
                  Find Your Dream Job at the World’s Top Companies
                </h1>
                {/* Description text with responsive margin and padding */}
                <p className="max-w-[600px] text-center mx-auto mt-4 sm:mt-6 lg:mt-8">
                  Discover endless opportunities across various industries with our easy-to-use job
                  search platform. Whether you're an experienced professional or just starting your
                  career, we've got the perfect match for you.
                </p>
                {/* Search input and button with responsive gap and padding */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4 sm:mt-6">
                  <div className="border border-[#D6D6D6] rounded-md w-full sm:w-auto">
                    {/* Responsive input width */}
                    <Input
                      placeholder="Enter a Job title"
                      className="w-full sm:w-[300px] md:w-[400px] border-none"
                    />
                  </div>
                  {/* Responsive button with padding adjustment */}
                  <Button className="bg-[#F77F00] w-full sm:w-auto px-6 py-2 mt-2 sm:mt-0">
                    Search
                  </Button>
                </div>
                {/* Image at the bottom with responsive margin */}
                <img
                  src={HomeImage}
                  alt="Home Description Image"
                  className="mt-4 sm:mt-6 rounded-[20px] max-w-full"
                />
              </div>
            </div>
          </div>
          <div className="h-screen bg-[#F9F9F9]">
            <h1>Featured Jobs</h1>
            <p>
              Explore the latest and most sought-after job openings from leading companies. We've
              curated a selection of top positions just for you.
            </p>
          </div>
          <section className="flex items-center justify-center p-8 md:p-16 bg-white">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-8">
                How Our Platform Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-1 rounded-full border-2 border-gray-500"></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Step 1: Search Jobs</h3>
                    <p className="text-gray-500">
                      Browse through thousands of job listings tailored to your skills and
                      preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-1 rounded-full border-2 border-gray-500"></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Step 2: Apply Easily</h3>
                    <p className="text-gray-500">
                      Submit your application with just a few clicks and track its progress in
                      real-time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 mt-1 rounded-full border-2 border-gray-500"></div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Step 3: Get Hired</h3>
                    <p className="text-gray-500">
                      Connect with employers directly and land your dream job faster than ever.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center md:text-left">
                <Link
                  to="/signup"
                  className="bg-[#F77F00] text-white px-6 py-3 rounded-full hover:bg-orange-600"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
