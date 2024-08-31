import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { resumeAxiosInstance } from "../axiosInstance";
import CVHeader from "../components/cv/CVHeader";
import ProfileSection from "../components/cv/ProfileSection";
import ContactSection from "../components/cv/ContactSection";

const CVView = () => {
  const [resume, setResume] = useState(null);
  const { userId } = useParams();
  const cvRef = useRef(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeAxiosInstance.get(`/${userId}`);
        setResume(response.data);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };

    fetchResume();
  }, [userId]);

  const handleDownloadCV = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: `Jobr_${resume?.firstName}_${resume?.lastName}_CV`,
    onAfterPrint: () => {
      toast.success("Your resume has been saved to storage.");
    },
  });

  return (
    <div className="bg-white min-h-screen p-8">
      <div ref={cvRef} className="max-w-4xl mx-auto bg-white border rounded-lg overflow-hidden">
        <CVHeader handleDownloadCV={handleDownloadCV} userId={userId} />
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-[1.4rem]">
              <ProfileSection resume={resume} />
              <ContactSection resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVView;
