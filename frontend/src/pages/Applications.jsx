/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useEmployer } from "../contexts/employerContext";

import { Separator } from "../components/ui/separator";
import EmployerApplication from "../components/all/EmployerApplication";
import { useApplication } from "../contexts/applicationContext";
import { Helmet } from "react-helmet";

const Applications = () => {
  const { employer } = useEmployer();
  const { getAllApplicationsByEmployer, applicationByEmployer: applications } = useApplication();

  const employerId = employer._id;

  useEffect(() => {
    getAllApplicationsByEmployer(employerId);
  }, [employerId]);

  return (
    <div className="p-3 w-[900px] md:w-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Applications | Jobr</title>
        <meta name="description" content="Manage and view all applications from employers." />
        <meta name="keywords" content="applications, employer, job, management" />
        <meta name="author" content="Your Name" />
      </Helmet>
      <div className="bg-white p-3">
        All Applications
        <Separator className="my-4" />
        <div>
          {applications?.map((application, index) => (
            <EmployerApplication key={index} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
