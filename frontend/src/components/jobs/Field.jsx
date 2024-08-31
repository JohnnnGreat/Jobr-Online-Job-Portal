import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Field = ({ label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={props.name}>{label}</Label>
    <Input id={props.name} {...props} />
  </div>
);

export default Field;
