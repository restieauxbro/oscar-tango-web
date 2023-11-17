"use client";

import { useChat } from "ai/react";
import React from "react";
import { captionStyles } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import Balancer from "react-wrap-balancer";
import { headingStyles } from "@/components/ui/typography";
import AnimateFromHidden from "../animations/AnimateFromHidden";
import { Button } from "../ui/button";

const HeroChat = () => {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
  const [chatOpen, setChatOpen] = React.useState(false);
  return (
    <div className="grid w-full max-w-screen-lg p-8">
      <AnimateFromHidden show={!!!messages.length} animateOnMount={false}>
        <div className="mb-24 max-w-xl lg:max-w-3xl">
          <h1 className={cn(headingStyles, "mb-8 md:text-5xl lg:text-7xl")}>
            <Balancer>A heading about bringing AI to industry</Balancer>
          </h1>
          <p className="max-w-lg text-lg lg:text-xl">
            We develop smart digital solutions for businesses looking forward.
            We’re a lean team who has cut the crap and trimmed the fat of agency
            work yada yada yada AI
          </p>
        </div>
      </AnimateFromHidden>
      <div>
        <AnimateFromHidden show={!!!messages.length} animateOnMount={false}>
          <p className={cn(captionStyles, "mb-4 text-base")}>
            Start your pre-consultation
          </p>
          <div className="mb-8 grid grid-cols-3 gap-4">
            {[
              {
                title: "AI Safety",
                description: "What do I need to do to make sure my AI is safe?",
              },
              {
                title: "Suggestion 2",
                description: "This is a description of suggestion 2",
              },
              {
                title: "Suggestion 3",
                description: "This is a description of suggestion 3",
              },
            ].map((suggestion, i) => (
              <Button
                key={i}
                className="h-auto rounded-lg border bg-zinc-100 px-6 py-6 text-left text-base text-zinc-800 shadow-md hover:bg-zinc-100"
                onClick={() => {
                  setInput(suggestion.description);
                }}
              >
                <div>
                  <h2 className="font-medium">{suggestion.title}</h2>
                  <p className="font-normal">{suggestion.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </AnimateFromHidden>
        <div>
          {messages.map((m) => (
            <div key={m.id} className="mb-8">
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
  );
};

export default HeroChat;
