import { useUser } from "../contexts/userContext";
import ProfileHeader from "../components/headers/ProfileHeader";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className="w-full ">
      <ProfileHeader />
      <div className=" h-full max-w-[1100px] rounded-lg mx-auto flex bg-[#E4E3E3] p-[1px] gap-[1px]">
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Profile;
