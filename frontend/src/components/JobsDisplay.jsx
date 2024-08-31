import { jobs } from "../constants";
import React, { useEffect } from "react";
import JobsCard from "./JobsCard";
import { useJob } from "../contexts/jobContext";
import { Button } from "./ui/button";

const JobsDisplay = () => {
  const { refresh, jobs } = useJob();

  useEffect(() => {
    refresh();
  }, []);
  return (
    <div className="bg-white w-full sticky h-auto rounded-md p-12">
      {jobs.length === 0 ? (
        <div className="flex  flex-col items-center justify-center h-full py-10">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Jobs Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find any jobs that match your search criteria. Try adjusting your
              filters or search terms.
            </p>
            <Button className="mt-4" onClick={refresh}>
              Reset Search
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobsCard key={job.id} jobInfo={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsDisplay;
