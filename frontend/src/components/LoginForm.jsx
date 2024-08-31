import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { calculatePasswordStrength } from "../lib/utils";

// Define the form schema with password validation rules
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!-%*?&#]/, { message: "Password must contain at least one symbol." }),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name:'',
      password: "",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordStrength(calculatePasswordStrength(value));
  };

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-1">
          {" "}
          <div className="flex-1 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                      type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
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
      </form>
    </Form>
  );
};

export default LoginForm;
