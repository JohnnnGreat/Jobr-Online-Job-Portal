import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const JobsCard = ({ jobInfo }) => {
  return (
    <Link
      to={`/jobs/${jobInfo?._id}`}
      className="block rounded-xl h-fit border p-4 max-w-full w-full overflow-hidden hover:bg-gray-100 transition-colors"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={jobInfo.companyLogo}
            alt={`${jobInfo.companyName} Logo`}
          />
          <div>
            <h1 className="text-lg font-bold">{jobInfo.companyName}</h1>
            <p className="text-gray-600 text-sm">{jobInfo.location}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold">{jobInfo.jobName}</h2>
        <div className="w-full">
          <ScrollArea>
            <div className="flex gap-2">
              <div className="bg-gray-200 rounded-full py-1 px-4 text-sm text-gray-700">
                {jobInfo.jobType}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <p className="text-sm mt-2 mb-2 line-clamp-3">{jobInfo.jobDescription}</p>
        <Separator />
        <p className="text-sm">
          {jobInfo.currency}{" "}
          <span className="font-bold text-lg">{jobInfo.salary.toLocaleString()}</span>
        </p>
      </div>
    </Link>
  );
};

export default JobsCard;
