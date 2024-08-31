import React, { useState } from "react";
import { useEmployer } from "../../contexts/employerContext";
import { Separator } from "../ui/separator";
import { employerNav } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import { ChevronsRightLeft } from "lucide-react";
import { Button } from "../ui/button";

const SideNav = () => {
  const { employer } = useEmployer();
  const location = useLocation();

  const [closeSide, setCloseSide] = useState(false);

  return (
   
  );
};

export default SideNav;
