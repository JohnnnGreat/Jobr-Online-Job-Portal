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
import { format } from "date-fns";

const formSchema = z.object({
  yearsOfExp: z.string().min(1, {
    message: "yearsOfExp must be at least 2 characters.",
  }),
  portfolio: z.string().min(2, {
    message: "portfolio must be at least 2 characters.",
  }),
});

const GeneralInfo = ({ userId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearsOfExp: "",
      portfolio: "",
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
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      const response = await resumeAxiosInstance.get(`/${userId}`);
      form.setValue("yearsOfExp", response?.data?.yearsOfExp);
      form.setValue("portfolio", response?.data?.portfolio);
    })();
  }, [userId]);
  return (
    <div>
      <h2 className="text-lg font-semibold mt-[1rem]">General Information</h2>
      <p className="text-sm text-gray-600 mb-4">
        We want to know more about the job you are applying for, your skillsets
      </p>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {" "}
              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="yearsOfExp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Portfolio</FormLabel>
                      <FormControl className="flex items-center">
                        <Input
                          type="url"
                          {...field}
                          id="portfolio"
                          placeholder="https://"
                          className="mt-1"
                        />
                      </FormControl>

                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
              </div>
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

export default GeneralInfo;
