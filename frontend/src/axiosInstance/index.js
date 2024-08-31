// axiosInstance.js
import axios from "axios";

// Create an instance of Axios with default settings
export const resumeAxiosInstance = axios.create({
  baseURL: "http://localhost:7070/api/resume", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

export const employerAxiosInstance = axios.create({
  baseURL: "http://localhost:7070/api/employer", // Replace with your base URL

  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

export const jobAxiosInstance = axios.create({
  baseURL: "http://localhost:7070/api/jobs", // Replace with your base URL

  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

export const applicationInstance = axios.create({
  baseURL: "http://localhost:7070/api/applications", // Replace with your base URL

  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});
