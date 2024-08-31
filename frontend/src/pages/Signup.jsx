import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import Divider from "../components/Divider";
import { Button } from "../components/ui/button";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../contexts/userContext";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useLoaderData();

  const { signInOrSignUp } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const handleLogin = async (googleData) => {
    try {
      // Verify and Retrieve User Information from Google
      const userInformation = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${googleData.access_token}` },
      });
      console.log(userInformation);
      const response = await axios.post(
        "http://localhost:7070/api/auth/google",
        { userPayload: userInformation.data },
        { headers: { "Content-Type": "application/json" } }
      );

      const { success, sessionToken, user } = response.data;

      if (success) {
        toast.success("Login Successfull");
      }
      signInOrSignUp(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("sessionToken", sessionToken);

      return navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLogin(tokenResponse),
  });

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <ToastContainer />
      <div className="flex items-center  flex-col w-[500px]">
        <h1 className="font-bold text-[2rem] ">Jobr.</h1>
        <div className="border p-4 rounded-2xl bg-white">
          <h1 className="text-[1.4rem] font-medium text-center">Create an account</h1>
          <p className="mt-2 text-[.8rem] text-gray-500 text-center">
            Create an account or sign in. By continuing, you agree to our Terms of Use and Privacy
            Policy.
          </p>

          <Button
            variant="outline"
            onClick={() => login()}
            className="w-full mt-3 flex gap-2 font-normal"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-5"
            >
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
            Sign up with Google
          </Button>

          <Divider />
          <p className="text-center">or</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
