import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisVertical, IdCardIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useJob } from "../../contexts/jobContext";
import { employerAxiosInstance } from "../../axiosInstance";
import { toast } from "react-toastify";
import { useEmployer } from "../../contexts/employerContext";

const JobCardEmp = ({ job }) => {
  const { refresh } = useJob();
  const { refreshJobPost } = useEmployer();
  const navigate = useNavigate();
  const handleDeleteJob = async (id) => {
    try {
      const response = await employerAxiosInstance.delete(`/deletejobbyid/${id}`);
      toast.success(response.data.message);
      refresh();
      refreshJobPost();
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative max-w-full mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-3">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="outline"
              onClick={() => {
                handleDeleteJob(job._id);
              }}
            >
              Delete Job Post
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/employer/applications");
              }}
            >
              My Applications
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center p-4">
        <img
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
          src={job.companyLogo}
          alt={job.companyName}
        />
        <div className="ml-4">
          <h2 className="text-lg sm:text-xl font-semibold">{job.companyName}</h2>
          <p className="text-sm text-gray-500">
            {job.companyVerified ? "Verified Company" : "Unverified Company"}
          </p>
        </div>
      </div>

      <div className="px-4 py-2">
        <h3 className="text-lg font-medium text-gray-800">{job.jobName}</h3>
        <p className="text-sm text-gray-600 mb-2">{job.location}</p>
        <p className="text-sm text-gray-600 mb-2">{job.jobType}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {job.jobDescription}
        </p>

        <div>
          <h4 className="text-md font-medium text-gray-800 mb-1 line-clamp-2 leading-relaxed">
            Job Requirements:
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {job.jobRequirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {job.currency} {job.salary.toLocaleString()}
          </span>
          <Link
            to={`mailto:${job.applicationEmail}`}
            className="text-white bg-[#F77F00] hover:bg-[#db7c15] px-4 py-2 rounded-md"
          >
            View Full Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCardEmp;
