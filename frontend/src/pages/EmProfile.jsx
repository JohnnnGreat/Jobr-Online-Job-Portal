import { useEmployer } from "../contexts/employerContext";
import EmployerProfile from "../components/employer/EmployerProfile";
import JobsList from "../components/employer/JobsList";

const EmProfile = () => {
  const { employer, allJobsByEmployer: jobs } = useEmployer();
  return (
    <div className="max-w-6xl mx-auto p-4">
      <EmployerProfile employer={employer} />
      <JobsList jobs={jobs} />
    </div>
  );
};

export default EmProfile;
