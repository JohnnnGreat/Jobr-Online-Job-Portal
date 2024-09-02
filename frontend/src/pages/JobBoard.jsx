/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useEmployer } from "../contexts/employerContext";
import { Mail } from "lucide-react";
import JobForm from "../components/jobs/JobForm";
import { employerAxiosInstance } from "../axiosInstance";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  const { employer, refreshJobPost } = useEmployer();

  const [newJob, setNewJob] = useState({
    companyName: "",
    location: "",
    jobName: "",
    experience: 0,
    jobType: "Remote",
    salary: 0,
    currency: "",
    jobResponsibilities: [],
    weOffer: [],
    jobRequirements: [],
    qualifications: [],
    technicalSkills: [],
    softSkills: [],
    preferredSkills: [],
    urgentHiring: false,
    aboutCompany: "",
    jobDescription: "",
    otherInfo: [],
    applicationEmail: "",
    companyLogo: "",
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await employerAxiosInstance.get("/jobs/getalljobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value, type, checked } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setNewJob((prevJob) => ({
      ...prevJob,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(newJob);
    e.preventDefault();
    try {
      await employerAxiosInstance.post("/jobs/add", {
        ...newJob,
        user: employer._id,
      });
      fetchJobs();
      refreshJobPost();
      setNewJob({
        companyName: "",
        location: "",
        jobName: "",
        experience: 0,
        jobType: "Remote",
        salary: 0,
        currency: "",
        jobResponsibilities: [],
        weOffer: [],
        jobRequirements: [],
        qualifications: [],
        technicalSkills: [],
        softSkills: [],
        preferredSkills: [],
        urgentHiring: false,
        aboutCompany: "",
        jobDescription: "",
        otherInfo: [],
        applicationEmail: "",
        companyLogo: "",
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      {!employer.isVerified ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="w-24 h-24 mb-6 flex items-center justify-center bg-white rounded-full shadow-md">
            <Mail className="text-yellow-500 w-12 h-12" />
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-2">Your Account is Not Verified</h2>
            <p className="text-sm text-gray-600 mb-4">
              Please verify your email address to start posting job opportunities.
            </p>
            <p className="text-sm text-gray-600">
              Check your email inbox and follow the verification link.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <JobForm
            newJob={newJob}
            handleInputChange={handleInputChange}
            handleArrayInputChange={handleArrayInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Current Job Postings</h2>
        {jobs?.length > 0 ? (
          <div className="space-y-4">
            {jobs?.map((job) => (
              <Card key={job._id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{job.jobName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div>
                        <strong>Company:</strong> {job.companyName}
                      </div>
                      <div>
                        <strong>Location:</strong> {job.location}
                      </div>
                      <div>
                        <strong>Experience:</strong> {job.experience} years
                      </div>
                      <div>
                        <strong>Job Type:</strong> {job.jobType}
                      </div>
                      <div>
                        <strong>Salary:</strong> {job.salary} {job.currency}
                      </div>
                      <div>
                        <strong>Application Email:</strong> {job.applicationEmail}
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong>Job Responsibilities:</strong> {job.jobResponsibilities.join(", ")}
                      </div>
                      <div>
                        <strong>We Offer:</strong> {job.weOffer.join(", ")}
                      </div>
                      <div>
                        <strong>Job Requirements:</strong> {job.jobRequirements.join(", ")}
                      </div>
                      <div>
                        <strong>Soft Skills:</strong> {job.softSkills.join(", ")}
                      </div>
                      <div>
                        <strong>About Company:</strong> {job.aboutCompany}
                      </div>
                      <div>
                        <strong>Job Description:</strong> {job.jobDescription}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {job.urgentHiring && <Badge variant="urgent">Urgent Hiring</Badge>}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No job postings available.</p>
        )}
      </div>
    </>
  );
};

export default JobBoard;
