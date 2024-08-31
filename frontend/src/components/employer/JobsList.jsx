import React from "react";
import { Separator } from "../ui/separator";

const JobsList = ({ jobs }) => (
  <section className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4">Jobs Uploaded</h2>
    <Separator className="my-2" />
    {jobs.length > 0 ? (
      <ul className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <li key={job.id} className="mb-4">
            <h3 className="text-xl font-semibold">{job.jobName}</h3>
            <p className="text-gray-600">{job.jobDescription}</p>
            <p className="text-gray-600 mt-2">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-600">
              <strong>Salary:</strong> {job.salary ? `$${job.salary}` : "Not Specified"}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600">No jobs uploaded yet.</p>
    )}
  </section>
);

export default JobsList;
