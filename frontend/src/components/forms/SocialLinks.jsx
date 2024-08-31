import React, { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { resumeAxiosInstance } from "../../axiosInstance";

const formSchema = z.object({
  linkedin: z.string().url({
    message: "This is not a valid URL. Please enter a valid URL.",
  }),
  facebook: z.string().url({
    message: "This is not a valid URL. Please enter a valid URL.",
  }),
  twitter: z.string().url({
    message: "This is not a valid URL. Please enter a valid URL.",
  }),
});

const SocialLinks = ({ userId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await resumeAxiosInstance.put(`/update-resume/${user.resumeId}`, {
        socials: values,
      });
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
      console.log(response);
      form.setValue("linkedin", response?.data?.socials?.linkedin);
      form.setValue("facebook", response?.data?.socials?.facebook);
      form.setValue("twitter", response?.data?.socials?.twitter);
    })();
  }, [userId]);
  return (
    <>
      <div>
        <h2 className="text-lg font-semibold mt-[1rem]">Social Media Links</h2>
        <p className="text-sm text-gray-600 mb-4">What are your social media links.</p>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                {" "}
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Linkedin</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormMessage className="my-[0!important] font-normal text-[.8rem]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
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
    </>
  );
};

export default SocialLinks;
