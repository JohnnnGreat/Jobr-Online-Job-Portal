import VerificationMessage from "../components/jobs/VerificationMessage";
import { useEmployer } from "../contexts/employerContext";

const EmployerDashboard = () => {
  const { employer } = useEmployer();
  return (
    <div className="max-w-[90%] mx-auto mt-4">
      {!employer?.isVerified && <VerificationMessage />}
    </div>
  );
};

export default EmployerDashboard;
