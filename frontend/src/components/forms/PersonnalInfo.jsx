import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useUser } from "../../contexts/userContext";
import { resumeAxiosInstance } from "../../axiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phoneNo: z.string().min(6, {
    message: "Phone No must be at least 10 characters.",
  }),
  homeAddress: z.string().min(2, {
    message: "Home Address must be at least 2 characters.",
  }),
  profileSummary: z.string({
    message: "Home Address must be at least 2 characters.",
  }),
});

const PersonnalInfo = ({ userId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNo: 0,
      homeAddress: "",
      profileSummary: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await resumeAxiosInstance.put(`/update-resume/${user.resumeId}`, values);
      toast.success(response.data.message);
      localStorage.setItem("resume", JSON.stringify(response.data.resume));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      const response = await resumeAxiosInstance.get(`/${userId}`);
      console.log(response);
      form.setValue("firstName", response?.data?.firstName);
      form.setValue("lastName", response?.data?.lastName);
      form.setValue("homeAddress", response?.data?.homeAddress);
      form.setValue("phoneNo", response?.data?.phoneNo);
      form.setValue("profileSummary", response?.data?.profileSummary);
    })();
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <p className="text-sm text-gray-600 mb-4">
        Provide your personal Information so your employer can now you better.
      </p>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {" "}
              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                {" "}
                <FormField
                  control={form.control}
                  name="homeAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Address</FormLabel>
                      <FormControl className="flex items-center">
                        <Input
                          type="text"
                          id="homeAddress"
                          placeholder="No 15, Vs Street, Ogun State, Nigeria"
                          className="mt-1"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone No</FormLabel>
                      <FormControl className="flex items-center">
                        <Input
                          type="number"
                          id="phoneNo"
                          placeholder="+234 702938473"
                          className="mt-1"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="profileSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Summary</FormLabel>
                    <FormControl className="flex items-center">
                      <Textarea
                        id="phoneNo"
                        placeholder="Write a Brief about yourself"
                        className="mt-1"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="gap-3 w-full mt-[.7rem] flex items-center"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonnalInfo;
