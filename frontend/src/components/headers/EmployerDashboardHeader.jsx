import React from "react";
import HeaderIndex from ".";
import { useEmployer } from "../../contexts/employerContext";
import ImageAvatar from "../../../public/avatar.png";

const EmployerDashboardHeader = () => {
  const { employer } = useEmployer();
  return (
    <HeaderIndex>
      <div className="flex gap-[1rem] items-center">
        <img
          src={employer?.profileImage ? employer?.profileImage : ImageAvatar}
          alt="profile-avatar "
          className=" w-[100px] border-gray-300 border-[2px] rounded-full cursor-pointer"
        />
        <div>
          <h1 className="text-white text-[2rem] font-semibold">{employer?.name}</h1>
          <p className="text-[#A0A0A0]">{employer?.email}</p>
        </div>
      </div>
    </HeaderIndex>
  );
};

export default EmployerDashboardHeader;
