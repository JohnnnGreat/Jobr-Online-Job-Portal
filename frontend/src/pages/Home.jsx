import JobsDisplay from "../components/JobsDisplay";
import Filter from "../components/Filter";
import HomeHeader from "../components/headers/HomeHeader";
// import { useUser } from "../contexts/userContext";
// import { useLoaderData } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full ">
      <HomeHeader />
      <div className=" h-full max-w-[1100px] rounded-lg mx-auto flex bg-[#E4E3E3] p-[1px] gap-[1px]">
        <Filter />
        <JobsDisplay />
      </div>
    </div>
  );
};

export default Home;
