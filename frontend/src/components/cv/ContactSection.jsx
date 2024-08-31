import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, PhoneIcon } from "lucide-react";
import LanguagesSection from "./LanguagesSection";
import { Separator } from "../ui/separator";

const ContactSection = ({ resume }) => (
  <div className="flex-1">
    <div className="mb-6 flex flex-col items-center gap-2">
      <Avatar className="size-40">
        <AvatarImage src={resume?.user?.profileImage} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-[2rem] font-bold text-gray-800 line-clamp-3 leading-relaxed">
          {`${resume?.firstName} ${resume?.lastName}`}
        </h1>
        <p className="text-gray-600 flex items-center gap-2">
          <PhoneIcon className="size-4" /> {resume?.phoneNo}
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          <MapPin className="size-4" /> {resume?.homeAddress}
        </p>
        <p>{resume?.user?.email}</p>
      </div>
      <Separator />
    </div>
    {resume?.languages?.length > 0 && <LanguagesSection languages={resume.languages} />}
  </div>
);

export default ContactSection;
