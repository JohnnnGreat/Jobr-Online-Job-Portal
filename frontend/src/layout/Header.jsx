import { navConstants } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import ImageAvatar from "../../public/avatar.png";
import { useUser } from "../contexts/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useEmployer } from "../contexts/employerContext";

import { employerAxiosInstance } from "../axiosInstance";
import { toast } from "react-toastify";

// Header Component
// eslint-disable-next-line react/prop-types
export const Header = () => {
  const { user, signOut: userSignOut } = useUser();

  const { employer, signOut } = useEmployer();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("sessionToken") ? true : false);
  const [employerIsLoggedIn] = useState(localStorage.getItem("employerToken") ? true : false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("sessionToken") ? true : false);
  }, []);

  console.log(isLoggedIn);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSendVerification = async (email) => {
    try {
      const response = await employerAxiosInstance.post("resend-verification-token", {
        email,
      });

      toast.success(response.data.msg);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to Send Verification Email");
    }
  };
  return (
    <header className="bg-black text-text px-2">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center h-[70px] border-b border-b-[#A0A0A0]">
        <Link to="/" className="text-white font-medium text-[1.3rem]">
          Jobr.
        </Link>
        <button className="text-white lg:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-7 6h7" />
          </svg>
        </button>
        <nav
          className={`p-[1rem] fixed top-0 right-0 h-full w-[80%] z-40 bg-[#000] text-white transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform lg:relative lg:translate-x-0 lg:flex lg:items-center lg:gap-4 lg:w-auto lg:bg-transparent`}
        >
          <button className="lg:hidden p-4" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="flex flex-col gap-4 p-4 lg:flex-row lg:gap-8 lg:p-0">
            {navConstants.map(
              (nav) =>
                nav.shouldRender && (
                  <li key={nav.id}>
                    <Link
                      className="hover:text-white text-[#ffffffa2] transition-all"
                      to={nav.route}
                    >
                      {nav.name}
                    </Link>
                  </li>
                )
            )}
          </ul>

          <div className="lg:flex lg:items-center lg:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src={user?.profileImage ? user?.profileImage : ImageAvatar}
                      alt="profile-avatar"
                      className="w-[40px] border-gray-300 border-[2px] rounded-full cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/myapplications">My Applications</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem
                      className="bg-red-500 block w-full h-full p-1 px-2 rounded-md text-white"
                      onClick={() => {
                        userSignOut();
                        navigate("/");
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div>
                  <h1 className="text-white font-medium text-[.9rem]">{user?.firstName}</h1>
                  <p className="text-[.8rem]">Freelancer</p>
                </div>
              </div>
            ) : employerIsLoggedIn ? (
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src={employer?.profileImage ? employer?.profileImage : ImageAvatar}
                      alt="profile-avatar"
                      className="w-[40px] border-gray-300 border-[2px] rounded-full cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/employer/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile/#myapplications">My Jobs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Add Job</DropdownMenuItem>
                    {employer && !employer.isVerified && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          handleSendVerification(employer.email);
                        }}
                      >
                        Verify Account
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      className="bg-red-500 cursor-pointer block w-full h-full p-1 px-2 rounded-md text-white"
                      onClick={() => signOut(navigate)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div>
                  <h1 className="text-white">{employer?.name}</h1>
                  <p
                    className={
                      employer?.isVerified
                        ? "text-green-500 text-[.8rem]"
                        : "text-red-500 text-[.8rem]"
                    }
                  >
                    {employer?.isVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            ) : (
              <Link to="/signup" className="bg-[#FBBC04] text-gray-900 py-2 px-6 rounded-3xl">
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
