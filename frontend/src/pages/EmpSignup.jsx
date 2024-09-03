import { useEffect, useState } from "react";
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
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

// Define the form schema with password validation rules
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!-%*?&#]/, { message: "Password must contain at least one symbol." }),
});

const EmpSignup = () => {
  const { signOut } = useUser();
  const isLoggedIn = useLoaderData();
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/employer/dashboard");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    signOut();
  }, [signOut]);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const onSubmit = async (values) => {
    setLoading(true); // Set loading to true when submission starts
    try {
      const response = await employerAxiosInstance.post("/signup", values);
      toast.success(response.data.msg);
    } catch (error) {
      console.error(error.response.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false); // Reset loading to false after submission completes
    }
  };

  const onError = (errors) => {
    console.error(errors);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center w-[500px]">
        <h1 className="font-bold text-[2rem]">Jobr.</h1>
        <div className="border p-4 rounded-2xl bg-white">
          <h1 className="text-[1.4rem] font-medium text-center">Create an Employer Account</h1>
          <p className="mt-2 text-[.8rem] text-gray-500 text-center">
            Create an account or sign in. By continuing, you agree to our Terms of Use and Privacy
            Policy.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="flex items-center">
                      <Input
                        type={"password"}
                        placeholder="Password"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handlePasswordChange(e);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-[.7rem] mt-0">
                      Password must be at least 8 characters and include lowercase, uppercase,
                      numbers, and symbols.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="password-strength-meter">
                <p className="font-medium text-[.8rem]">Password strength:</p>
                <div className="strength-bars">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`strength-bar ${
                        index < passwordStrength ? `filled-${passwordStrength}` : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="block w-full mt-[.7rem]" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}{" "}
                {/* Update button content based on loading state */}
              </Button>
              <p className="text-center text-gray-700 text-[.8rem] mt-2">
                Already Signed Up?{" "}
                <Link className="hover:underline text-black" to="/employer/signin">
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmpSignup;
