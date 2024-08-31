// UserContext.js
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from "react";
import { employerAxiosInstance } from "../axiosInstance";

// Create the UserContext
const EmployerContext = createContext();

// Create a custom hook to use the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const useEmployer = () => {
  return useContext(EmployerContext);
};

// Create a provider component
// eslint-disable-next-line react/prop-types
export const EmployerProvider = ({ children }) => {
  const [employer, setEmployer] = useState(JSON.parse(localStorage.getItem("employer")));
  const [allJobsByEmployer, setAllJobsByEmployer] = useState(
    JSON.parse(localStorage.getItem("allJobs"))
  );

  const refreshJobPost = async () => {
    const response = await employerAxiosInstance.get(`/getalljobsbyemployer/${employer._id}`);
    localStorage.setItem("allJobs", JSON.stringify(response.data));
  };

  const refreshEmployer = async (user) => {
    localStorage.setItem("employer", JSON.stringify(user));
    setEmployer(user);
  };

  const getSearchResults = (searchText) => {
    const searchResults = JSON.parse(localStorage.getItem("allJobs")).filter((job) => {
      return (
        job.jobName.toLowerCase().includes(searchText.toLowerCase()) ||
        job.location.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    if (searchResults.length == 0) {
      setAllJobsByEmployer(JSON.parse(localStorage.getItem("allJobs")));
    }
    setAllJobsByEmployer(searchResults);
  };

  // Function to handle user sign-in or sign-up
  const signInOrSignUp = async (userData) => {
    const { sessionToken, user } = userData;
    setEmployer(user);
    localStorage.setItem("employer", JSON.stringify(user));
    localStorage.setItem("employerToken", JSON.stringify(sessionToken));

    // All Jobs Ny Employer

    const response = await employerAxiosInstance.get(`/getalljobsbyemployer/${user._id}`);
    localStorage.setItem("allJobs", JSON.stringify(response.data));
  };

  return (
    <EmployerContext.Provider
      value={{
        employer,
        signInOrSignUp,
       
        allJobsByEmployer,
        getSearchResults,
        refreshJobPost,
        refreshEmployer,
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};
