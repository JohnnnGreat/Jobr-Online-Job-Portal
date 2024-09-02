import CVHeader from "../components/headers/CVHeader";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import PersonnalInfo from "../components/forms/PersonnalInfo";
import GeneralInfo from "../components/forms/GeneralInfo";
import Skill from "../components/forms/Skill";
import Languages from "../components/forms/Languages";
import JobExperience from "../components/forms/JobExperience";
import { Link, useParams, useSearchParams } from "react-router-dom";
import SocialLinks from "../components/forms/SocialLinks";
import Divider from "../components/Divider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "react-toastify";
import { applicationInstance, jobAxiosInstance } from "../axiosInstance";
import { useUser } from "../contexts/userContext";
import { useApplication } from "../contexts/applicationContext";
import { Helmet } from "react-helmet";

const EditCv = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview");
  const jobid = searchParams.get("jobid");
  const employerId = searchParams.get("employerid");

  const { refresh } = useApplication();

  const { user, setUserDetails } = useUser();

  const handleCoverPageFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      if (
        fileType === "application/pdf" ||
        fileType === "application/msword" /* .doc */ ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" /* .docx */
      ) {
        const toastId = toast.loading("Uploading file...");
        const formData = new FormData();
        formData.append("file", file);

        const res = await jobAxiosInstance.post(`/uploadfile/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setUserDetails(res.data.user);

        toast.update(toastId, {
          render: "File uploaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.error("Oops! Unsupported File Format");
      }
    }
  };

  const handleJobApplication = async () => {
    try {
      const response = await applicationInstance.post("/", {
        userId: userId,
        jobId: jobid,
        coverLetter: user?.coverLetter,
        resumeUrl: `http://localhost:5173/mycv/cvview/${userId}`,
        applicationStatus: "applied",
        employerId: employerId,
      });

      toast.success(response.data.message);
      refresh(userId);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Edit CV | ${user?.firstName} ${user?.lastName}`}</title>
        <meta
          name="description"
          content={`Edit the CV for ${user?.firstName} ${user?.lastName}.`}
        />
        <meta
          name="keywords"
          content="CV, resume, job application, professional profile, edit CV"
        />
        <meta name="author" content={`${user?.firstName} ${user?.lastName}`} />
      </Helmet>
      <CVHeader isPreview={isPreview} />
      <div className="max-w-5xl mx-auto p-2 flex justify-center bg-white rounded-lg mt-[1rem]">
        <Card className="w-full max-w-4xl  bg-white rounded-lg">
          <CardHeader>
            <CardTitle>Fill out the following Information</CardTitle>
            <Divider />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <PersonnalInfo userId={userId} />
                {/* General Information Section */}
                <GeneralInfo userId={userId} />

                {/* Social Media Links Section */}
                <SocialLinks userId={userId} />
                <Skill userId={userId} />
              </div>
              <div>
                <Languages userId={userId} />
                <JobExperience userId={userId} />
                {isPreview && (
                  <div className="mb-6">
                    <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700">
                      {user?.coverLetter ? "Change Cover Letter" : "Upload Cover Letter"}
                    </label>
                    <Input
                      type="file"
                      id="resumeFile"
                      onChange={handleCoverPageFileChange}
                      className="mt-1"
                    />
                  </div>
                )}
                {user?.coverLetter && (
                  <Link target="_blank" className="underline" to={user?.coverLetter}>
                    View PDF
                  </Link>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 text-right">
              {isPreview ? (
                <div>
                  <Link
                    to={`/mycv/cvview/${userId}`}
                    className="bg-yellow-400 block hover:bg-yellow-500 rounded-[10px] font-medium text-center text-black py-3"
                  >
                    View Cv
                  </Link>
                  <Button
                    onClick={handleJobApplication}
                    className="w-full mt-[1rem]"
                    variant="outline"
                  >
                    Apply for this Job
                  </Button>
                </div>
              ) : (
                <Link
                  to={`/mycv/cvview/${userId}`}
                  className="bg-yellow-400 block hover:bg-yellow-500 rounded-[10px] font-medium text-center text-black py-3"
                >
                  View Cv
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditCv;
