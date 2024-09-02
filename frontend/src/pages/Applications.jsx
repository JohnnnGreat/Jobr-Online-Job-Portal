import { useEffect, useState } from "react";
import { useEmployer } from "../contexts/employerContext";
import { applicationInstance } from "../axiosInstance";
import { Separator } from "../components/ui/separator";
import EmployerApplication from "../components/all/EmployerApplication";
import { useApplication } from "../contexts/applicationContext";

const Applications = () => {
  const { employer } = useEmployer();
  const { getAllApplicationsByEmployer, applicationByEmployer: applications } = useApplication();
  const employerId = employer._id;

  useEffect(() => {
    getAllApplicationsByEmployer(employerId);
  }, [employerId]);

  return (
    <div className="p-3 w-[900px] md:w-full ">
      <div className="bg-white p-3">
        All Applications
        <Separator className="my-4" />
        <div>
          {applications?.map((application, index) => (
            // console.log(response);
            <EmployerApplication key={index} application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
