import React from "react";

const ProfileSummary = ({ profileSummary }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-1">Profile Summary</h2>
    <p className="text-gray-600">
      {profileSummary ||
        "I am a frontend developer with 4 years of experience, building frontend applications using top rated frontend technologies. My core value lies around building applications with modern designs, and technologies and are highly optimal."}
    </p>
  </div>
);

export default ProfileSummary;
