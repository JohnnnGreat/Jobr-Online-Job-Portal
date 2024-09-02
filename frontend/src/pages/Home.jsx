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
          <div className="bg-[#FEFCF2] pt-[4rem] relative p-3">
            <img
              src={PatternRight}
              className="h-full absolute left-[-5rem] top-0 hidden lg:inline-block"
            />
            <div className="max-w-[1100px] mx-auto  flex items-center justify-center ">
              <div>
                {" "}
                <h1 className="text-[40px] font-semibold max-w-[700px] text-center leading-[1.2]">
                  Find Your Dream Job at the World’s Top Companies
                </h1>
                <p className="max-w-[600px] text-center mx-auto mt-[1rem] bg-[#fffff]">
                  Discover endless opportunities across various industries with our easy-to-use job
                  search platform. Whether you're an experienced professional or just starting your
                  career, we've got the perfect match for you.
                </p>
                <div className="flex gap-3 justify-center mt-[.8rem]">
                  <div className="border border-[#D6D6D6] rounded-md">
                    <Input placeholder="Enter a Job title" className="w-[400px] border-none " />
                  </div>

                  <Button className="bg-[#F77F00]">Search</Button>
                </div>
                <img
                  src={HomeImage}
                  alt="Home Description Image"
                  className="mt-[1.2rem] rounded-[20px]"
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
