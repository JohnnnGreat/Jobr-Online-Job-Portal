import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/userContext";
import { ResumeProvider } from "./contexts/resumeContext";
import { EmployerProvider } from "./contexts/employerContext";
import { JobProvider } from "./contexts/jobContext";
import { ApplicationProvider } from "./contexts/applicationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumeProvider>
      <ApplicationProvider>
        <JobProvider>
          <EmployerProvider>
            <UserProvider>
              <GoogleOAuthProvider clientId="79946673447-0e7h6b04a3aq1kfhb6qikml7rld246ah.apps.googleusercontent.com">
                <NextUIProvider>
                  <RouterProvider router={router} />
                </NextUIProvider>
              </GoogleOAuthProvider>
            </UserProvider>
          </EmployerProvider>
        </JobProvider>
      </ApplicationProvider>
    </ResumeProvider>
  </StrictMode>
);
