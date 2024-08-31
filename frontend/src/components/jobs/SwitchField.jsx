import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

// SwitchField component
const SwitchField = ({ id, name, checked, onChange, label }) => (
  <div className="flex items-center space-x-2">
    <Switch
      id={id}
      name={name}
      checked={checked}
      onCheckedChange={(checked) => onChange({ target: { name, checked, type: "checkbox" } })}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

export default SwitchField;
