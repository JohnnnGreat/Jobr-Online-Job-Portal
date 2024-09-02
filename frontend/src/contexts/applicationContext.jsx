/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { applicationInstance } from "../axiosInstance";

// Create the ApplicationContext
const ApplicationContext = createContext();

// Create a custom hook to use the ApplicationContext
export const useApplication = () => {
  return useContext(ApplicationContext);
};

// Create a provider component
export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [applicationByEmployer, setApplicationByEmployer] = useState([]);
  const [totalApplications, setTotalApplications] = useState([]);

  // Fetch Applications from localStorage or initialize with empty array
  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem("Applications")) || [];
    setApplications(storedApplications);
  }, []);

  // Refresh Application data and update localStorage
  const refresh = async (userId) => {
    try {
      const response = await applicationInstance.get(`/user/${userId}`);

      const newApplications = response.data;
      localStorage.setItem("applications", JSON.stringify(newApplications));
      setApplications(newApplications);
    } catch (error) {
      console.error("Failed to refresh Applications:", error);
    }
  };

  const refreshDefault = async (employerId) => {
    const res = await applicationInstance.get(`/get-all-jobs-by-employer/${employerId}`);

    setApplicationByEmployer(res.data);
  };

  const getAllApplicationsByEmployer = async (employerId) => {
    try {
      const response = await applicationInstance.get(`/get-all-jobs-by-employer/${employerId}`);
      setApplicationByEmployer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllApplicationsForJob = async (jobId) => {
    try {
      const response = await applicationInstance.get(`/job/${jobId}`);
      setTotalApplications(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicationById = (ApplicationId) => {
    const ApplicationsData = JSON.parse(localStorage.getItem("Applications")) || [];
    const Application = ApplicationsData.find((Application) => Application._id === ApplicationId);
    return Application;
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        refresh,
        getApplicationById,
        getAllApplicationsByEmployer,
        applicationByEmployer,
        getAllApplicationsForJob,
        totalApplications,
        refreshDefault,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
