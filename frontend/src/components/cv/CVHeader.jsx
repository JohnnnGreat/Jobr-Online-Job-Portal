import React from "react";
import { Button } from "../ui/button";
import { Download, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const CVHeader = ({ handleDownloadCV, userId }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="space-x-4">
      <Button onClick={handleDownloadCV} variant="secondary">
        <Download size={20} />
      </Button>
      <Link to={`/mycv/editcv/${userId}`} className="inline-block">
        <Edit size={20} />
      </Link>
    </div>
  </div>
);

export default CVHeader;
