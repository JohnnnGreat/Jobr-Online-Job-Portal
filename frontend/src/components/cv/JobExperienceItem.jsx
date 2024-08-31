import { Briefcase, Calendar, MapPin } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

const JobExperienceItem = ({ job }) => (
  <div className="mb-4">
    <h3 className="text-lg font-medium text-gray-800">{job.title}</h3>
    <div className="flex items-center gap-[.9rem]">
      <p className="text-gray-600 flex items-center">
        <Briefcase size={16} className="mr-1" /> {job.company}
      </p>
      <p className="text-gray-600 flex items-center">
        <MapPin size={16} className="mr-1" /> {job.location}
      </p>
      <p className="text-gray-500 flex items-center">
        <Calendar size={16} className="mr-1" />
        {new Date(job?.startDate.$date).toLocaleDateString()} -{" "}
        {job?.endDate ? new Date(job.endDate.$date).toLocaleDateString() : "Present"}
      </p>
    </div>
    {job.responsibilities && <p className="text-gray-600 mt-2">{job.responsibilities}</p>}
    <Separator/>
  </div>
);

export default JobExperienceItem;
