import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Divider from "../Divider";
import { useUser } from "../../contexts/userContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { resumeAxiosInstance } from "../../axiosInstance";

const Skill = ({ userId }) => {
  const { user } = useUser();
  const [skills, setSkills] = React.useState([""]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    (async function () {
      const response = await resumeAxiosInstance.get(`/${userId}`);
      setSkills(response?.data.skills);
    })();
  }, [userId]);

  const handleAddSkill = () => setSkills([...skills, ""]);

  const handleRemoveSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  const handleSaveSkills = async () => {
    setIsLoading(true);
    try {
      const response = await resumeAxiosInstance.put(`/update-resume/${user.resumeId}`, {
        skills: skills,
      });
      toast.success(response.data.message);
      localStorage.setItem("resume", JSON.stringify(response.data.resume));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mt-[1rem]">Skills</h2>
      <p className="text-sm text-gray-600 mb-4">
        Add One or More Skills to make you Resume Standout
      </p>

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            placeholder={`Skill ${index + 1}`}
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            className="mt-1 flex-grow mr-2"
          />
          <Button variant="destructive" onClick={() => handleRemoveSkill(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={handleAddSkill}>
        Add Skill
      </Button>
      <Divider />
      <Button
        disabled={isLoading}
        onClick={handleSaveSkills}
        type="submit"
        className="gap-3 w-full mt-[.7rem] flex items-center"
      >
        {isLoading && <Loader2 className="animate-spin" />}
        Save
      </Button>
    </div>
  );
};

export default Skill;
