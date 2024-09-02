// axiosInstance.js
import axios from "axios";
const userToken = localStorage.getItem("sessionToken");
const employerToken = JSON.parse(localStorage.getItem("employerToken"));

// Create an instance of Axios with default settings
export const resumeAxiosInstance = axios.create({
  baseURL:
    import.meta.env.DEV === true
      ? "http://localhost:7070/api/resume"
      : "https://jobr-online-job-portal.onrender.com/api/resume",
  headers: {
    "Content-Type": "application/json",

    // You can set other default headers here
  },
});

export const employerAxiosInstance = axios.create({
  baseURL:
    import.meta.env.DEV === true
      ? "http://localhost:7070/api/employer"
      : "https://jobr-online-job-portal.onrender.com/api/employer",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${employerToken}`,
    // You can set other default headers here
  },
});


export const jobAxiosInstance = axios.create({
  baseURL:
    import.meta.env.DEV === true
      ? "http://localhost:7070/api/jobs"
      : "https://jobr-online-job-portal.onrender.com/api/jobs",

  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

export const applicationInstance = axios.create({
  baseURL:
    import.meta.env.DEV === true
      ? "http://localhost:7070/api/applications"
      : "https://jobr-online-job-portal.onrender.com/api/applications",

  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});
