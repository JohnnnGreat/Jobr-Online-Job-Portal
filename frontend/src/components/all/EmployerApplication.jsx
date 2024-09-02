import React, { useEffect, useState } from "react";
import { applicationInstance } from "../../axiosInstance";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import SelectField from "../jobs/SelectField";
import { useApplication } from "../../contexts/applicationContext";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";

const EmployerApplication = ({ application }) => {
  const { getAllApplicationsForJob, totalApplications, refreshDefault } = useApplication();
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getAllApplicationsForJob(application?.jobId?._id);
  }, []);

  const [value, setValue] = useState("");

  const onValueChange = async (value) => {
    setStatus(value.target.value);
    // const response = await applicationInstance.put(`${application._id}`, {
    //   applicationStatus: value.target.value,
    // });
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await applicationInstance.put(`${application._id}`, {
        applicationStatus: status,
        feedback: text,
      });

      toast.success(
        "Application status has been updated successfully. A notification email has been sent to the applicant."
      );

      setValue("");
      setText("");
      setStatus("");
    } catch (error) {
      toast.error(
        "An error occurred while updating the application status. Please try again later."
      );
    } finally {
      refreshDefault(application?.employerId);
    }
  };
  return (
    <div
      key={application._id}
      className="border rounded p-[1rem] grid grid-cols-1 lg:grid-cols-2 gap-[1rem] "
    >
      <div>
        {" "}
        <h1 className="text-[1.6rem] font-semibold">{application?.jobId?.jobName}</h1>
        <div className="flex items-center gap-2">
          {" "}
          <h1 className="font-light">
            Uploaded On{" "}
            <span className="font-medium">
              {new Date(application?.jobId?.createdAt).toLocaleDateString()}
            </span>
          </h1>
          <h1 className="font-light">
            {totalApplications.length} <span className="font-medium">Applications</span>
          </h1>
        </div>
        <Separator className="my-2" />
        <div className="flex gap-2 items-center">
          <img
            className="size-10 rounded-full"
            src={application?.userId?.profileImage}
            alt="Application User Profile Image"
          />
          <div>
            <h1 className="text-gray-500 font-light">Application By</h1>
            <p>
              {application?.userId?.firstName} {application?.userId?.lastName}
            </p>
          </div>
          <div>
            <h1 className="text-gray-500 font-light">Application Status</h1>
            {application?.applicationStatus === "applied" && (
              <p className="text-green-500 bg-green-100 rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                {application?.applicationStatus}
              </p>
            )}
            {application?.applicationStatus === "reviewing" && (
              <p className="text-yellow-500 bg-yellow-100 rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                {application?.applicationStatus}
              </p>
            )}
            {application?.applicationStatus === "shortlisted" && (
              <p className="text-blue-500 bg-blue-100 rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                {application?.applicationStatus}
              </p>
            )}
            {application?.applicationStatus === "rejected" && (
              <p className="text-red-500 bg-red-100 rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                {application?.applicationStatus}
              </p>
            )}
            {application?.applicationStatus === "accepted" && (
              <p className="text-indigo-500 bg-indigo-100 rounded-full py-1 px-2 text-center uppercase text-[.8rem]">
                {application?.applicationStatus}
              </p>
            )}
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="font-light">
            Applied On{" "}
            <span className="font-medium">
              {new Date(application?.createdAt).toLocaleDateString()}
            </span>
          </h1>
          <Button>View Application</Button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold my-2">Application Response</h1>
        <Separator className="my-2" />
        <SelectField
          label="Change Status"
          name={"ChangeStatus"}
          value={status}
          options={["applied", "reviewing", "shortlisted", "rejected", "accepted"]}
          onValueChange={onValueChange}
        />
        <div className="mt-[1rem]">
          <h1 className="font-semibold my-2">Add a FeedBack</h1>
          <Textarea onChange={handleTextChange} className="inline-block"></Textarea>
          <Button onClick={handleSubmit}>Send Feedback</Button>
        </div>
      </div>
    </div>
  );
};

export default EmployerApplication;
