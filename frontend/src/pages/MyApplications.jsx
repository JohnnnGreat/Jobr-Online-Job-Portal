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

  console.log(applications);

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
                {application.applicationStatus === "applied" && (
                  <span className="text-green-700 font-normal py-1 px-4 rounded inline-block bg-green-100 font-medium">
                    {application.applicationStatus}
                  </span>
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
