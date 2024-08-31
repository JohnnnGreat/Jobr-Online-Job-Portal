import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/userContext";
import { resumeAxiosInstance } from "../../axiosInstance";

const JobExperience = ({ userId }) => {
  const [endDate, setEndDate] = React.useState();
  const [startDate, setStartDate] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useUser();

  const [jobExperience, setJobExperience] = React.useState([
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  ]);
  const handleAddJobExperience = () => {
    setJobExperience([
      ...jobExperience,
      { title: "", company: "", location: "", startDate: "", endDate: "", responsibilities: "" },
    ]);
  };

  const handleRemoveJobExperience = (index) =>
    setJobExperience(jobExperience.filter((_, i) => i !== index));

  const handleJobExperienceChange = (index, field, value) => {
    const newJobExperience = [...jobExperience];
    newJobExperience[index][field] = value;
    setJobExperience(newJobExperience);
  };

  const handleSaveJobExperience = async (index) => {
    if (jobExperience.length === 0) {
      console.log("ss");
      toast.error("It seems you haven't added any Job Experience yet");
    }
    try {
      const response = await resumeAxiosInstance.put(`/update-resume/${user.resumeId}`, {
        jobExperience: jobExperience,
      });
      toast.success(response.data.message);
      localStorage.setItem("resume", JSON.stringify(response.data.resume));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      const response = await resumeAxiosInstance.get(`/${userId}`);
      setJobExperience(response.data.jobExperience);
    })();
  }, [userId]);
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">Job Experience</label>
      {jobExperience.map((job, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <Input
              type="text"
              placeholder="Marketing Manager"
              value={job.title}
              onChange={(e) => handleJobExperienceChange(index, "title", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <Input
              type="text"
              placeholder="TechInnovate Solutions"
              value={job.company}
              onChange={(e) => handleJobExperienceChange(index, "company", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <Input
              type="text"
              placeholder="San Francisco, CA"
              value={job.location}
              onChange={(e) => handleJobExperienceChange(index, "location", e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="mb-2 flex w-full gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-start text-left font-normal",
                      !job.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {job.startDate ? format(job.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={job.startDate}
                    onSelect={(date) => {
                      handleJobExperienceChange(index, "startDate", date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-start text-left font-normal",
                      !job.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {job.endDate ? format(job.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={job.endDate}
                    onSelect={(date) => {
                      handleJobExperienceChange(index, "endDate", date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mb-2"></div>

          <Button variant="destructive" onClick={() => handleRemoveJobExperience(index)}>
            Remove Job Experience
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={handleAddJobExperience}>
        Add Job Experience
      </Button>
      <Button
        disabled={isLoading}
        onClick={handleSaveJobExperience}
        type="submit"
        className="gap-3 w-full mt-[.7rem] flex items-center"
      >
        {isLoading && <Loader2 className="animate-spin" />}
        Save
      </Button>
    </div>
  );
};

export default JobExperience;
