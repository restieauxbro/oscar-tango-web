"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button, LoadingButton } from "../ui/button";
import AnimateFromHidden from "../animations/AnimateFromHidden";
import { headingStyles } from "../ui/typography";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const PasswordPromptDialog = ({ client }: { client: string }) => {
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  const handleSubmit = (e: any) => {
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const request = await fetch(`/api/auth/`, {
        body: JSON.stringify({ password, client }),
        headers: { "Content-Type": "application/json" },
        method: "post",
      });

      if (request.status !== 200)
        return setPasswordIncorrect(true), setLoading(false);
      else window.location.reload();
    };
    onSubmit(e);
  };

  return (
    <>
      <div className="grid min-h-screen place-items-center p-8">
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-sm gap-4 text-center"
        >
          <h1 className={cn(headingStyles, "mb-2")}>Halt, traveller 🔒</h1>
          <div>
            <label htmlFor="password" className="hidden">
              Password:
            </label>
            <Input
              type="password"
              id="password"
              placeholder="What's the password?"
              className="text-center"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AnimateFromHidden show={passwordIncorrect}>
              <p className="pt-2 text-sm text-red-500">
                Incorrect password, try again
              </p>
            </AnimateFromHidden>
          </div>
          <LoadingButton type="submit" {...{ loading, loaderFill: "fill-white" }}>
            Submit
          </LoadingButton>
        </form>
      </div>
    </>
  );
};

export default PasswordPromptDialog;
