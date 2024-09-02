import React from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// SelectField component
const SelectField = ({ label, name, value, onValueChange, options }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Select
      name={name}
      value={value}
      onValueChange={(value) => {
        onValueChange({ target: { name: "jobType", value } });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default SelectField;
