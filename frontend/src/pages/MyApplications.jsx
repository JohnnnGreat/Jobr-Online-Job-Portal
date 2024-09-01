import React from "react";
import { useApplication } from "../contexts/applicationContext";
import { useUser } from "../contexts/userContext";
import { Button } from "../components/ui/button";

const MyApplications = () => {
  const { applications, refresh } = useApplication();

  const { user } = useUser();
  React.useEffect(() => {
    refresh(user._id);
  }, []);

  const handleCancelApplication = () => {};
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white mt-[2rem]">
      <h1 className="text-2xl font-bold mb-4">Your Applications</h1>
      {applications.length === 0 ? (
        <div className="text-center text-gray-600">No applications found.</div>
      ) : (
        <ul className="space-y-4">
          {applications.map((application) => (
            <li key={application._id} className="bg-white border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{application.jobId.jobName}</h2>
              <p className="text-gray-400 font-light">
                Status:{" "}
                {application?.applicationStatus === "applied" && (
                  <p className="text-green-500 bg-green-100 w-fit font-normal rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                    {application?.applicationStatus}
                  </p>
                )}
                {application?.applicationStatus === "reviewing" && (
                  <p className="text-yellow-500 bg-yellow-100 w-fit font-normal rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                    {application?.applicationStatus}
                  </p>
                )}
                {application?.applicationStatus === "shortlisted" && (
                  <p className="text-blue-500 bg-blue-100 w-fit font-normal rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                    {application?.applicationStatus}
                  </p>
                )}
                {application?.applicationStatus === "rejected" && (
                  <p className="text-red-500 bg-red-100 w-fit font-normal rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                    {application?.applicationStatus}
                  </p>
                )}
                {application?.applicationStatus === "accepted" && (
                  <p className="text-indigo-500 bg-indigo-100  font-normal w-fit rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                    {application?.applicationStatus}
                  </p>
                )}
              </p>
              <p className="text-gray-400 font-light">
                Applied Date:{" "}
                <span className="text-black font-medium">
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </p>
              <Button
                onClick={() => handleCancelApplication(application._id)}
                className="mt-2  text-white py-1 px-4 rounded"
              >
                Cancel Application
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
