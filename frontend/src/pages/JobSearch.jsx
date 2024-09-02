import React, { useEffect, useState } from "react";
import JobSearchResults from "../components/headers/JobSearchResults";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { jobAxiosInstance } from "../axiosInstance";
import JobsCard from "../components/JobsCard";
import { Separator } from "../components/ui/separator";

const JobSearch = () => {
  const searchParams = useParams();

  const { jobid } = searchParams;

  const [allJobs, setAllJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Number of jobs per page

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await jobAxiosInstance.get(`/getjobbysearch/${jobid}`);
        setAllJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getRecentJobs = async () => {
      setLoading(true);
      try {
        const response = await jobAxiosInstance.get(`/getrecentjobs?limit=${limit}&page=${page}`);
        console.log(response);
        setRecentJobs(response.data);
      } catch (error) {
        toast.error("Error fetching jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
    getRecentJobs();
  }, [jobid, limit, page]);

  return (
    <>
      <JobSearchResults searchTitle={jobid} searchResults={allJobs.length} />
      <div className="bg-white ">
        <div className="max-w-[1100px] mx-auto flex p-4 gap-4">
          {" "}
          {/* Left Section */}
          <div className="flex-1 md:flex-none md:w-1/3">
            <h1 className="text-[1.4rem] font-semibold">Recent Jobs</h1>
            <Separator className="my-2" />
            <div>
              <ul className="flex flex-col gap-3">
                {recentJobs.map((job) => (
                  <Link to={`/jobs/${job?._id}`} key={job._id} className="border p-3 rounded-md">
                    <div className="flex gap-2">
                      <img className="size-12" src={job.companyLogo} />
                      <div>
                        <h2 className="font-bold">{job.jobName}</h2>{" "}
                        <p className="text-gray-400 font-light">
                          Posted on: {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                        <h1 className="text-[1.1rem] mt-[.5rem]">
                          {job.currency} {job.salary.toLocaleString()}
                        </h1>
                      </div>
                    </div>

                    {/* Add more job details here if needed */}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex-1 md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {allJobs.length > 0 ? (
              allJobs.map((job) => <JobsCard key={job._id} jobInfo={job} />)
            ) : (
              <div className="col-span-full text-center p-4">
                <h2 className="text-lg font-semibold">No Jobs Found</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSearch;
