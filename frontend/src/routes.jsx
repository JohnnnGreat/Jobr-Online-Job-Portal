import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import EditCv from "./pages/EditCv";
import CVView from "./pages/CVView";
import SingleJob from "./pages/SingleJob";
import AddJob from "./pages/JobBoard";
import EmpSignup from "./pages/EmpSignup";
import VerifyEmployerAccount from "./pages/VerifyEmployerAccount";
import JobBoard from "./pages/JobBoard";
import EmpLogin from "./pages/EmpLogin";
import EmployerLayout from "./pages/EmployerLayout";
import EmployerAllJobs from "./pages/EmployerAllJobs";
import { employerAxiosInstance } from "./axiosInstance";
import MyApplications from "./pages/MyApplications";
import Applications from "./pages/Applications";
import EmProfile from "./pages/EmProfile";
import ApplicationDetails from "./pages/ApplicationDetails";
import JobSearch from "./pages/JobSearch";
import NotFound from "./pages/404";
import Login from "./pages/Login";

const getUserLoginStatus = () => {
  const token = JSON.parse(localStorage.getItem("sessionToken"));
  return !!token;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      const token = localStorage.getItem("sessionToken");
      const user = localStorage.getItem("user");
      return !!(token && user);
    },

    children: [
      { path: "/", element: <Home /> },
      { path: "/jobsearch/:jobid", element: <JobSearch /> },
      { path: "/myapplications", element: <MyApplications /> },
      { path: "/about", element: <About />, loader: () => "Hello, World" },
      { path: "/signup", element: <Signup />, loader: getUserLoginStatus },
      { path: "/signin", element: <Login />, loader: getUserLoginStatus },
      { path: "/profile", element: <Profile /> },
      { path: "/logout", element: <Logout /> },
      { path: "jobs/:jobId", element: <SingleJob /> },
      { path: "jobs/addjob", element: <AddJob /> },
      {
        path: "/employer",
        children: [
          {
            path: "signup",
            element: <EmpSignup />,
            loader: () => !!JSON.parse(localStorage.getItem("employerToken")),
          },
          { path: "signin", element: <EmpLogin /> },
          { path: "verify/:token", element: <VerifyEmployerAccount /> },

          {
            path: "/employer",
            element: <EmployerLayout />,
            children: [
              { path: "addjob", index: true, element: <JobBoard /> },
              {
                path: "applications",
                element: <Applications />,
                children: [{ path: ":applicationId", element: <ApplicationDetails /> }],
              },
              { path: "profile", element: <EmProfile /> },
              {
                path: "alljobs",
                element: <EmployerAllJobs />,
              },
            ],
          },
        ],
      },
      {
        path: "/mycv",
        children: [
          { path: "editcv/:userId", element: <EditCv /> },
          { path: "cvview/:userId", element: <CVView /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    status: 404,
  },
]);

export default router;
