import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Field from "./Field";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import SwitchField from "./SwitchField";
import { Button } from "../ui/button";

const JobForm = ({ newJob, handleInputChange, handleArrayInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Create New Job Posting</CardTitle>
        <CardDescription>Fill in the details for the new job posting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Field
              label="Company Name"
              name="companyName"
              value={newJob.companyName}
              onChange={handleInputChange}
              required
            />
            <Field
              label="Location"
              name="location"
              value={newJob.location}
              onChange={handleInputChange}
              required
            />
            <Field
              label="Job Name"
              name="jobName"
              value={newJob.jobName}
              onChange={handleInputChange}
              required
            />
            <Field
              label="Experience (years)"
              name="experience"
              type="number"
              value={newJob.experience}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Job Type"
              name="jobType"
              value={newJob.jobType}
              onValueChange={handleInputChange}
              options={["Remote", "On-site", "Hybrid"]}
            />
            <Field
              label="Salary"
              name="salary"
              type="number"
              value={newJob.salary}
              onChange={handleInputChange}
            />
            <Field
              label="Currency"
              name="currency"
              value={newJob.currency}
              onChange={handleInputChange}
              required
            />
            <TextareaField
              label="Job Responsibilities (comma-separated)"
              name="jobResponsibilities"
              value={newJob.jobResponsibilities.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "jobResponsibilities")}
              required
            />
            <TextareaField
              label="Other Info (comma-separated)"
              name="otherInfo"
              value={newJob.otherInfo.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "otherInfo")}
            />
            <Field
              label="We Offer (comma-separated)"
              name="weOffer"
              value={newJob.weOffer.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "weOffer")}
              required
            />
          </div>
          <div>
            <SwitchField
              id="urgentHiring"
              name="urgentHiring"
              checked={newJob.urgentHiring}
              onChange={handleInputChange}
              label="Urgent Hiring"
            />
            <TextareaField
              label="About Company"
              name="aboutCompany"
              value={newJob.aboutCompany}
              onChange={handleInputChange}
              required
            />
            <TextareaField
              label="Job Description (comma-separated)"
              name="jobDescription"
              value={newJob.jobDescription}
              onChange={handleInputChange}
              required
            />
            <TextareaField
              label="Job Requirements (comma-separated)"
              name="jobRequirements"
              value={newJob.jobRequirements.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "jobRequirements")}
              required
            />
            <TextareaField
              label="Soft Skills (comma-separated)"
              name="softSkills"
              value={newJob.softSkills.join(", ")}
              onChange={(e) => handleArrayInputChange(e, "softSkills")}
            />
            <Field
              label="Application Email"
              name="applicationEmail"
              type="email"
              value={newJob.applicationEmail}
              onChange={handleInputChange}
              required
            />
            <Field
              label="Company Logo URL"
              name="companyLogo"
              type="url"
              value={newJob.companyLogo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Create Job Posting</Button>
      </CardFooter>
    </Card>
  </form>
);

export default JobForm;
