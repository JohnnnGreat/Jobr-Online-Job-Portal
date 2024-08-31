import React from "react";
import ProfileSummary from "./ProfileSummary";
import WorkExperience from "./WorkExperience";
import SkillsSection from "./SkillsSection";

const ProfileSection = ({ resume }) => (
  <div className="w-[500px]">
    <ProfileSummary profileSummary={resume?.profileSummary} />
    <WorkExperience jobExperience={resume?.jobExperience} />
    <SkillsSection skills={resume?.skills} />
  </div>
);

export default ProfileSection;
