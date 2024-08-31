import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Divider from "../Divider";
import { useUser } from "../../contexts/userContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { resumeAxiosInstance } from "../../axiosInstance";

const Languages = () => {
  const [languages, setLanguages] = React.useState([""]);
  const handleAddLanguage = () => setLanguages([...languages, ""]);
  const handleRemoveLanguage = (index) => setLanguages(languages.filter((_, i) => i !== index));
  const handleLanguageChange = (index, value) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">Languages</label>
      {languages.map((language, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            placeholder={`Language ${index + 1}`}
            value={language}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            className="mt-1 flex-grow mr-2"
          />
          <Button variant="destructive" onClick={() => handleRemoveLanguage(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={handleAddLanguage}>
        Add Language
      </Button>
    </div>
  );
};

export default Languages;
