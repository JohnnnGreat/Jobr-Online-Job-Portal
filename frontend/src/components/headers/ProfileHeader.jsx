import React from "react";
import HeaderIndex from ".";
import { useUser } from "../../contexts/userContext";

const ProfileHeader = () => {
  const { user } = useUser();
  return (
    <HeaderIndex>
      <div className="flex gap-[1rem] items-center">
        <img
          src={user?.profileImage}
          alt="This is the User Profile Image"
          className="rounded-full border-[4px] border-[#FBBC04]"
        />

        <div>
          <h1 className="text-white text-[2rem] font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-[#A0A0A0]">{user?.email}</p>
        </div>
      </div>
    </HeaderIndex>
  );
};

export default ProfileHeader;
