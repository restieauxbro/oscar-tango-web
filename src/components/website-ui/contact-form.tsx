"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { headingStyles } from "../ui/typography";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import Script from "next/script";
import { handleRecaptcha } from "@/lib/recaptcha";
import { FormDetailsForAPI } from "@/app/api/notify-of-lead/route";

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "We need a first name to address you by",
  }),
  last_name: z.string().min(1, {
    message: "We need a last name to address you by",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  message: z.string().min(1, {
    message: "Please enter a message",
  }),
});

export function ProfileForm() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      setFormState("submitting");
      console.log("trying recaptcha");

      const captchaPassed = await handleRecaptcha();

      if (!captchaPassed) throw new Error("Captcha failed");

      if (captchaPassed) {
        const body: FormDetailsForAPI = {...values, created_at: new Date()}
        // post to /api/notify-of-lead
        const res = await fetch("/api/notify-of-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        console.log(res);
        if (res.ok) {
          setFormState("success");
        }
      } else {
        throw new Error("Captcha failed");
      }
    } catch (err) {
      console.log(err);
      setFormState("error");
    }
  }

  const disabled = ["submitting", "success", "error"].includes(
    formState,
  ) as boolean;

  return (
    <>
      <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LcYsCUpAAAAAL2k6jL8Mn2AutiUC9U8igN2ivtz" />
      <MotionConfig transition={{ duration: 1 }}>
        <div className="relative">
          <motion.div
            animate={{ opacity: formState === "success" ? 0 : 1 }}
            className={formState === "success" ? "pointer-events-none" : ""}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@gmail.com"
                            {...field}
                            className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="021 378 3689"
                            {...field}
                            className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                            disabled={disabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John's Doughnuts"
                          {...field}
                          className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project"
                          {...field}
                          className="bg-slate-900/80 text-white backdrop-blur-sm focus:bg-slate-800/70"
                          disabled={disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton
                  type="submit"
                  loading={disabled}
                  loaderFill="fill-white"
                >
                  Submit
                </LoadingButton>
              </form>
            </Form>
          </motion.div>
          <AnimatePresence>
            {formState === "success" && (
              <motion.div
                className="absolute left-0 top-0 flex h-full w-full max-w-sm items-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div>
                  <motion.h4
                    className={cn(headingStyles, "mb-2 font-medium text-white")}
                  >
                    Thank you!
                  </motion.h4>
                  <motion.p>
                    <Balancer>
                      {`We've received your enquiry and will be in touch shortly.`}
                    </Balancer>
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </>
  );
}
