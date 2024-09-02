import { useEmployer } from "../contexts/employerContext";
import EmployerProfile from "../components/employer/EmployerProfile";
import JobsList from "../components/employer/JobsList";
import { Helmet } from "react-helmet";

const EmProfile = () => {
  const { employer, allJobsByEmployer: jobs } = useEmployer();
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Employer </title>
      </Helmet>
      s
      <EmployerProfile employer={employer} />
      <JobsList jobs={jobs} />
    </div>
  );
};

export default EmProfile;
