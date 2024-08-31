/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// UserContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { jobAxiosInstance } from "../axiosInstance";

// Create the JobContext
const JobContext = createContext();

// Create a custom hook to use the JobContext
export const useJob = () => {
  return useContext(JobContext);
};

// Create a provider component
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from localStorage or initialize with empty array
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  // Refresh job data and update localStorage
  const refresh = async () => {
    try {
      const response = await jobAxiosInstance.get("/");
      console.log(response);
      const newJobs = response.data;
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      setJobs(newJobs);
    } catch (error) {
      console.error("Failed to refresh jobs:", error);
    }
  };

  const getJobById = (jobId) => {
    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    const job = jobsData.find((job) => job._id === jobId);
    return job;
  };

  // Filter jobs based on search text
  const getSearchResults = (searchText) => {
    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    const searchLowercased = searchText.toLowerCase();
    const searchResults = jobsData.filter(
      (job) =>
        job.jobName.toLowerCase().includes(searchLowercased) ||
        job.location.toLowerCase().includes(searchLowercased)
    );

    setJobs(searchResults.length ? searchResults : jobsData);
  };

  // Filter jobs based on advanced search criteria
  const getAdvanceSearchResults = ({ type, value }) => {
    const jobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    let filteredJobs = [];

    switch (type) {
      case "jobType":
        filteredJobs = jobsData.filter((job) => job.jobType.toLowerCase() === value.toLowerCase());
        break;
      case "salary":
        filteredJobs = jobsData.filter((job) => job.salary >= value[0] && job.salary <= value[1]);
        break;
      case "date":
        filteredJobs = jobsData.filter((job) => new Date(job.datePosted) >= value);
        break;
      case "expertise":
        filteredJobs = jobsData.filter(
          (job) => job.expertiseLevel.toLowerCase() === value.toLowerCase()
        );
        break;
      default:
        filteredJobs = jobsData;
    }

    setJobs(filteredJobs);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        getSearchResults,
        refresh,
        getAdvanceSearchResults,
        getJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
