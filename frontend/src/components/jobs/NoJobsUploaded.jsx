import React from "react";

const NoJobsUploaded = () => {
  return (
    <div className="flex bg-white mt-[1rem] rounded-md border flex-col items-center justify-center h-full py-10">
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Jobs Uploaded Yet</h2>
        <p className="text-gray-600 mb-6">
          It looks like you haven't uploaded any jobs to our platform yet.
        </p>
        <p className="text-gray-600 mb-6">
          To get started, click the "Upload Job" button and fill out the details about your
          opportunities. If you need any assistance, feel free to check out our help center or
          contact our support team. We're here to help you make the most out of our platform! Happy
          job posting!
        </p>
      </div>
    </div>
  );
};

export default NoJobsUploaded;
