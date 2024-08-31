import React from "react";

const SkillsSection = ({ skills }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Skills</h2>
    <div className="flex flex-wrap">
      {skills?.map((skill, index) => (
        <span
          key={index}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm mr-2 mb-2"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillsSection;
