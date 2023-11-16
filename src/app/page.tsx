"use client";

import { Input } from "@/components/ui/input";
import Balancer from "react-wrap-balancer";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { captionStyles, headingStyles } from "@/components/ui/typography";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <main>
      <div className="grid min-h-screen place-items-center">
        <div className="grid w-full max-w-screen-lg">
          <div className="mb-24 max-w-3xl">
            <h1 className={cn(headingStyles, "mb-8 lg:text-6xl")}>
              <Balancer>A heading about bringing AI to industry</Balancer>
            </h1>
            <p className="max-w-lg text-lg lg:text-xl">
              We develop smart digital solutions for businesses looking forward.
              We’re a lean team who has cut the crap and trimmed the fat of
              agency work yada yada yada AI
            </p>
          </div>
          <div className="grid gap-6">
            <p className={cn(captionStyles, "text-base")}>
              Start your pre-consultation
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "Suggestion 1",
                  description: "This is a description of suggestion 1",
                },
                {
                  title: "Suggestion 1",
                  description: "This is a description of suggestion 1",
                },
                {
                  title: "Suggestion 1",
                  description: "This is a description of suggestion 1",
                },
              ].map((suggestion, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-zinc-100 p-4 shadow-md"
                >
                  <h2 className="font-medium">{suggestion.title}</h2>
                  <p>{suggestion.description}</p>
                </div>
              ))}
            </div>
            <div>
              {messages.map((m) => (
                <div key={m.id}>
                  {m.role}: {m.content}
                </div>
              ))}

              <form onSubmit={handleSubmit}>
                <Input
                  value={input}
                  className="w-full px-5 py-6 text-lg"
                  placeholder="Say something..."
                  onChange={handleInputChange}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 min-h-screen rounded-3xl bg-slate-300"></div>
    </main>
  );
}
