/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculatePasswordStrength } from "../lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { z } from "zod";
import { employerAxiosInstance } from "../axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEmployer } from "../contexts/employerContext";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";

// Define the form schema with password validation rules
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!-%*?&#]/, { message: "Password must contain at least one symbol." }),
});

const EmpLogin = () => {
  const { signInOrSignUp } = useEmployer();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordStrength(calculatePasswordStrength(value));
  };

  async function onSubmit(values) {
    setIsSigningUp(true); // Show loader
    const toastId = toast.loading("Authenticating your credentials...");
    try {
      const response = await employerAxiosInstance.post("/login", values);
      toast.update(toastId, {
        render: "Welcome back! You're now logged in.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      await signInOrSignUp(response.data);
      navigate("/employer/alljobs");
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.msg || "An error occurred. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setIsSigningUp(false); // Hide loader
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Helmet>
        <meta
          name="description"
          content="Log in to your Jobr employer account to manage job postings and review applications. Secure login with email and password."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Company Name" />
        <meta property="og:title" content="Jobr Employer Login" />
        <meta
          property="og:description"
          content="Securely log in to your Jobr employer account to access job management features and view applications."
        />
      </Helmet>
      <div className="flex flex-col items-center w-[500px]">
        <h1 className="font-bold text-2xl">Jobr.</h1>
        <div className="border p-4 rounded-2xl bg-white w-full">
          <h1 className="text-lg font-medium text-center">Log in to Your Employer Account</h1>
          <p className="mt-2 text-[.8rem] text-gray-500 text-center">
            Sign in to continue. By logging in, you agree to our
            <Link to="/terms" className="underline text-blue-600">
              {" "}
              Terms of Use
            </Link>{" "}
            and
            <Link to="/privacy" className="underline text-blue-600">
              {" "}
              Privacy Policy
            </Link>
            .
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-xs mt-1">
                      Password must be at least 8 characters and include a mix of letters, numbers,
                      and symbols.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgotten Password Link */}
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Password strength meter */}
              <div className="password-strength-meter mt-1">
                <p className="font-medium text-xs">Password strength:</p>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-1/5 mx-0.5 rounded ${
                        index < passwordStrength ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full mt-4 flex justify-center items-center">
                {isSigningUp ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>

              {/* Redirect link */}
              <p className="text-center text-gray-700 text-xs mt-2">
                Already have an account?{" "}
                <Link className="hover:underline text-black" to="/employer/signin">
                  Log In
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
