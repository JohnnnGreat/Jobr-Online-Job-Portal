/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { BadgeCheck, Heart } from "lucide-react";
import SingleHeader from "../components/headers/SingleHeader";
import { useUser } from "../contexts/userContext";
import { useJob } from "../contexts/jobContext";

const SingleJob = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  console.log(job);
  const { user } = useUser();
  const { getJobById, refresh } = useJob();

  useEffect(() => {
    refresh();
    const jobR = getJobById(jobId);
    setJob(jobR);
  }, []);

  return (
    <>
      <SingleHeader jobTitle={job?.jobName} />
      {/* Adjust the flex layout to stack vertically on smaller screens */}
      <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-[1rem] mt-[1rem] p-3">
        {/* This section will take full width on small screens */}
        <div className="bg-white p-[1rem] rounded-l-[1rem] w-full lg:w-auto">
          <div className="flex items-center flex-col">
            <img src={job?.companyLogo} className="w-full max-w-[150px]" alt="Company Logo" />
            <div>
              <h1 className="text-center font-bold text-[2rem] flex gap-[.6rem] items-center">
                {job?.companyName}
                <BadgeCheck className={job?.companyVerified ? "text-green-500" : "text-gray-400"} />
              </h1>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h1 className="font-semibold text-[1.1rem] mt-[1rem]">About Company</h1>
            <p className="text-gray-600 font-light">{job?.aboutCompany}</p>
          </div>
        </div>
        {/* This section will stack below the company info on small screens */}
        <div className="bg-white p-[1.5rem] rounded-r-[1rem] relative w-full lg:w-auto">
          <Heart className="absolute top-5 right-9" />
          <div>
            <div className="flex flex-col lg:flex-row gap-[1rem]">
              <Separator orientation="vertical" className="hidden lg:block" />
              <div>
                <h1 className="font-light text-[1.1rem] mt-[1rem] text-[#0000007e]">Job Type</h1>
                <p className="font-medium">{job?.jobType}</p>
              </div>

              <div>
                <h1 className="font-light text-[1.1rem] mt-[1rem] text-[#0000007e] ">
                  Job Description
                </h1>
                <p className="font-medium">{job?.jobType}</p>
              </div>
              <div>
                <h1 className="font-light text-[1.1rem] mt-[1rem] text-[#0000007e] ">Salary</h1>
                <p className="font-medium">{job?.salary === 0 ? "Not Specified" : job?.salary}</p>
              </div>
            </div>
            {job?.urgentHiring && (
              <p className="bg-[#ff00000c] text-[#FF0000] w-fit mt-[1rem] py-2 px-3 rounded-2xl">
                Urgently Hiring
              </p>
            )}
            <div>
              <h1 className="font-semibold text-[1.1rem] mt-[1rem]">Experience</h1>
              <Separator className="my-1" />
              <p className="text-gray-600">{job?.jobDescription}</p>
            </div>

            <div>
              <h1 className="font-semibold text-[1.1rem] mt-[1rem]">Job Responsibilities</h1>
              <Separator className="my-1" />
              <ul className="font-light list-decimal list-inside">
                {job?.jobResponsibilities.map((job, index) => (
                  <li key={index}>{job}</li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className="font-semibold text-[1.1rem] mt-[1rem]">We Offer</h1>
              <Separator className="my-1" />
              {job?.weOffer && (
                <ul className="font-light list-decimal list-inside">
                  {job?.weOffer.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
              )}
            </div>
            {job?.requirements && (
              <div>
                <h1 className="font-semibold text-[1.1rem] mt-[1rem]">We Offer</h1>
                <Separator className="my-1" />
                <ul className="font-light list-decimal list-inside">
                  {job?.requirements.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
              </div>
            )}
            {job?.softSkills && (
              <div>
                <h1 className="font-semibold text-[1.1rem] mt-[1rem]">Soft Skills</h1>
                <Separator className="my-1" />
                <ul className="font-light list-decimal list-inside">
                  {job?.softSkills.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
              </div>
            )}

            {job?.technicalSkills && (
              <div>
                <h1 className="font-semibold text-[1.1rem] mt-[1rem]">Technical Skills</h1>
                <Separator className="my-1" />
                <ul className="font-light list-decimal list-inside">
                  {job?.technicalSkills.map((job, index) => (
                    <li key={index}>{job}</li>
                  ))}
                </ul>
              </div>
            )}

            <p>Years of Experience: {job?.experience}</p>
            <Separator className="my-1" />
            <div>
              {user ? (
                <div>
                  <Link
                    to={`/mycv/editcv/${user._id}?preview=true&jobid=${jobId}&employerid=${job?.user}`}
                    className="inline-block bg-[#F77F00] py-2 px-5 rounded-md font-semibold mt-[1rem]"
                  >
                    Apply Now
                  </Link>
                  <p className="text-gray-600 font-light mt-[1rem]">
                    Or you can directly send a mail to the company's email address
                  </p>
                  <a
                    href={`mailto:${job?.applicationEmail}`}
                    className="text-[#156DF0]  inline-block"
                  >
                    {job?.applicationEmail}
                  </a>
                </div>
              ) : (
                <Link to="/signup" className="inline-block top-3 underline">
                  Login to Apply
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleJob;
