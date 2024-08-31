// axiosInstance.js
import axios from "axios";
const userToken = localStorage.getItem("sessionToken");

// Create an instance of Axios with default settings
export const resumeAxiosInstance = axios.create({
  baseURL:
    import.meta.env.DEV === true
      ? "http://localhost:7070/api/resume"
      : "https://jobr-online-job-portal.onrender.com/api/resume",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
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
    // You can set other default headers here
  },
});

console.log(import.meta.env.DEV);
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
