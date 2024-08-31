import React, { useState } from "react";
import Divider from "./Divider";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "@nextui-org/react";
import { expertise, jobTypes } from "../constants";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useJob } from "../contexts/jobContext";

const Filter = () => {
  const [value, setValue] = React.useState([50000, 300000]);
  const [date, setDate] = React.useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { getAdvanceSearchResults } = useJob();

  const handleJobType = (jobType) => {
    getAdvanceSearchResults({ type: "jobType", value: jobType });
  };

  const handleSalaryChange = (newValue) => {
    setValue(newValue);
    getAdvanceSearchResults({ type: "salary", value: newValue });
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    getAdvanceSearchResults({ type: "date", value: newDate });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        variant="outline"
        className="fixed z-20 top-[15rem] right-4 md:hidden text-white"
      >
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        )}
      </Button>

      {/* Filter Section */}
      <div
        className={`fixed z-10 top-0 right-0 h-full w-[90%] md:w-[400px] bg-white rounded-l-lg p-4 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h1 className="text-xl font-semibold mb-4">Filter</h1>
        <Divider />
        {/* Job Type */}
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Job Type</h2>
          <div className="space-y-2">
            {jobTypes.map((jobType, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox onCheckedChange={() => handleJobType(jobType.label)} />
                <label className="text-gray-700">{jobType.label}</label>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        {/* Salary Expectations */}
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Salary Expectations</h2>
          <Slider
            step={5000}
            minValue={20000}
            maxValue={500000}
            size="sm"
            value={value}
            label="Salary Expectations"
            showTooltip={true}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="w-full"
            onChange={handleSalaryChange}
          />
        </div>
        <Divider />
        {/* Date Posted */}
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Date Posted</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full flex items-center justify-between text-left",
                  !date && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <Divider />
        {/* Expertise Level */}
        <div className="mt-4">
          <h2 className="text-lg font-medium mb-2">Expertise Level</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select expertise level" />
            </SelectTrigger>
            <SelectContent>
              {expertise.map((level, index) => (
                <SelectItem key={index} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
