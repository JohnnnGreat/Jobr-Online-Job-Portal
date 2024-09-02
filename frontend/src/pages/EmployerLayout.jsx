import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronsRightLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { employerNav } from "../constants";
import { Outlet } from "react-router-dom"; // Required for routing
import { useEmployer } from "../contexts/employerContext";

const EmployerLayout = () => {
  const { employer } = useEmployer();
  const employerToken = localStorage.getItem("employerToken");

  const location = useLocation(); // Get current route location

  const [closeSide, setCloseSide] = useState(false);

  return (
    <>
      {employer || employerToken ? (
        <div className="h-screen flex overflow-hidden">
          <div
            className={`bg-white w-[300px] border-r transition-all duration-150 ease-out ${
              closeSide ? "w-[80px]" : "w-[300px]"
            }`}
          >
            <div className="h-full w-full p-3">
              <div className="h-[100px] flex items-center justify-center">
                <div>
                  <h1 className="text-[1.2rem] font-bold">{employer?.name}</h1>
                </div>
              </div>

              <Separator />
              <nav className="mt-[1rem]">
                <ul className="flex flex-col gap-3">
                  {employerNav.map((nav) => (
                    <li key={nav.route}>
                      <Link
                        to={nav.route}
                        className={`text-[.93rem] text-gray-800 flex gap-3 p-[1rem] rounded-md ${
                          location.pathname === nav.route
                            ? "bg-[#FBBC04] text-black"
                            : "bg-[#f3f3f3a8]"
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
      ) : (
        <div className="flex items-center  justify-center h-screen">
          <div className="text-center bg-white rounded-md p-5">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You need to log in as an employer to access this page.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerLayout;
