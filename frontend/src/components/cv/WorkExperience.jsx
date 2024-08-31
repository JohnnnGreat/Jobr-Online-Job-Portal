import React from "react";
import JobExperienceItem from "./JobExperienceItem";

const WorkExperience = ({ jobExperience }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Work Experience</h2>
    {jobExperience?.map((job, index) => (
      <JobExperienceItem key={index} job={job} />
    ))}
  </div>
);

export default WorkExperience;
