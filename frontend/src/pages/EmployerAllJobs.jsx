import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { useEmployer } from "../contexts/employerContext";
import JobCardEmp from "../components/all/JobCardEmp";
import NoJobsUploaded from "../components/jobs/NoJobsUploaded";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const EmployerAllJobs = () => {
  const { allJobsByEmployer: jobs, getSearchResults, refreshJobPost } = useEmployer();
  console.log(jobs);
  useEffect(() => {
    refreshJobPost();
  }, []);

  return (
    <div className="max-w-[90%] lg:max-w-[80%] mx-auto mt-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Employer | All Applications</title>
      </Helmet>

      <div>
        {" "}
        <div className="my-4">
          <h1 className="text-2xl font-semibold mb-4">My Added Jobs</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter a Job title"
              onChange={(e) => getSearchResults(e.target.value)}
            />
            <Button>Search</Button>
          </div>
        </div>
        <Separator />
        {jobs?.length === 0 ? (
          <NoJobsUploaded />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
            {jobs.map((job, index) => (
              <JobCardEmp key={index} job={job} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1>You need to verify your account to continue</h1>
      </div>
    </div>
  );
};

export default EmployerAllJobs;
