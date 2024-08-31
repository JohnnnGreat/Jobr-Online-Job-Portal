import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronsRightLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { employerNav } from "../constants";
import { Outlet } from "react-router-dom"; // Required for routing
import { useEmployer } from "../contexts/employerContext";

const EmployerLayout = () => {
  const { employer } = useEmployer(); // Get employer details from context
  const location = useLocation(); // Get current route location

  const [closeSide, setCloseSide] = useState(false); // State to toggle sidebar width

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className={`bg-white w-[300px] border-r transition-all duration-150 ease-out ${
          closeSide ? "w-[80px]" : "w-[300px]"
        }`}
      >
        <div className="h-full w-full p-3">
          <div className="h-[100px] flex items-center justify-center">
            <div>
              <h1 className="text-[1.2rem] font-bold">{employer.name}</h1>
            </div>
          </div>

          <Separator />
          <nav className="mt-[1rem]">
            <ul className="flex flex-col gap-3">
              {employerNav.map((nav) => (
                <li key={nav.route}>
                  <Link
                    to={nav.route}
                    className={`flex gap-3 p-[1rem] rounded-md ${
                      location.pathname === nav.route ? "bg-[#FBBC04] text-black" : "bg-[#f3f3f3a8]"
                    }`}
                  >
                    {nav.icon}
                    {!closeSide && nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button
            variant="underline"
            className="absolute bottom-2"
            onClick={() => setCloseSide(!closeSide)}
          >
            <ChevronsRightLeft />
          </Button>
        </div>
      </div>
      <div className="overflow-y-scroll w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployerLayout;
