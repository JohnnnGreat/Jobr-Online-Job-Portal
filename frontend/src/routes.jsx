import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import EditCv from "./pages/EditCv";
import CVView from "./pages/cvView";
import SingleJob from "./pages/SingleJob";
import AddJob from "./pages/JobBoard";
import EmpSignup from "./pages/EmpSignup";
import VerifyEmployerAccount from "./pages/VerifyEmployerAccount";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobBoard from "./pages/JobBoard";
import EmpLogin from "./pages/EmpLogin";
import EmployerLayout from "./pages/EmployerLayout";
import EmployerAllJobs from "./pages/EmployerAllJobs";
import { employerAxiosInstance } from "./axiosInstance";
import MyApplications from "./pages/MyApplications";
import Applications from "./pages/Applications";
import EmProfile from "./pages/EmProfile";

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
      { path: "/myapplications", element: <MyApplications /> },
      { path: "/about", element: <About />, loader: () => "Hello, World" },
      { path: "/signup", element: <Signup />, loader: getUserLoginStatus },
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
          { path: "dashboard", element: <EmployerDashboard /> },
          {
            path: "/employer",
            element: <EmployerLayout />,
            children: [
              { path: "addjob", element: <JobBoard /> },
              { path: "applications", element: <Applications /> },
              { path: "profile", index: true, element: <EmProfile /> },
              {
                path: "alljobs",
                element: <EmployerAllJobs />,
                loader: async () => {
                  const employer = JSON.parse(localStorage.getItem("employer"));
                  const response = await employerAxiosInstance.get(
                    `/getalljobsbyemployer/${employer._id}`
                  );
                  return response;
                },
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
]);

export default router;
