// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from "react";

// Create the ResumeContext
const ResumeContext = createContext();

export const useResume = () => {
  return useContext(ResumeContext);
};

// eslint-disable-next-line react/prop-types
export const ResumeProvider = ({ children }) => {
  const [user, setResume] = useState(JSON.parse(localStorage.getItem("resume")));

  const setResumeInfo = (resumeData) => {
    setResume(resumeData);
  };

  return <ResumeContext.Provider value={{ user, setResumeInfo }}>{children}</ResumeContext.Provider>;
};
