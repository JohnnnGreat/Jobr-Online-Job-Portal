import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

// TextareaField component
const TextareaField = ({ label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={props.name}>{label}</Label>
    <Textarea id={props.name} {...props} />
  </div>
);

export default TextareaField;
