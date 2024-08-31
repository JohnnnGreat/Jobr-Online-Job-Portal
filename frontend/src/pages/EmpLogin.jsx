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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordStrength(calculatePasswordStrength(value));
  };

  async function onSubmit(values) {
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

      navigate("/employer/dashboard");
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.msg,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <div className="flex items-center  flex-col w-[500px]">
        <h1 className="font-bold text-[2rem] ">Jobr.</h1>
        <div className="border p-4 rounded-2xl bg-white">
          <h1 className="text-[1.4rem] font-medium text-center">Create and Employer Account</h1>
          <p className="mt-2 text-[.8rem] text-gray-500 text-center">
            Create an account or sign in. By continuing, you agree to our Terms of Use and Privacy
            Policy.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onerror)}>
              <div className="">
                {" "}
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
                <div className="flex-1">
                  {" "}
                  {/* Password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl className="flex items-center">
                          <Input
                            type={"password"} // Toggle input type based on showPassword state
                            placeholder="Password"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handlePasswordChange(e);
                            }}
                          />
                        </FormControl>

                        <FormDescription className="text-[.7rem] mt-[0!important]">
                          Password must be at least 8 characters and include lowercase, uppercase,
                          numbers, and symbols.
                        </FormDescription>
                        <FormMessage className="my-[0!important]" />
                      </FormItem>
                    )}
                  />
                  {/* Password strength meter */}
                  <div className="password-strength-meter">
                    <p className="font-medium text-[.8rem]">Password strength:</p>
                    <div className="strength-bars">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`strength-bar ${
                            index < passwordStrength ? `filled-${passwordStrength}` : ""
                          }`}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="block w-full mt-[.7rem]">
                Submit
              </Button>
              <p className="text-center text-gray-700 text-[.8rem] mt-2">
                Yet to Sign in?{" "}
                <Link className="hover:underline text-black" to="/employer/signin">
                  Create an Account
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
