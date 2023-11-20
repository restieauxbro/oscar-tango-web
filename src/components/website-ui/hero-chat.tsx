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
import Image from 'next/image'
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionTemplate,
} from "framer-motion";

const HeroChat = () => {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
    const springEase = {
      stiffness: 200,
      damping: 20,
      restDelta: 0.001,
    }
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [100, 1000], [0, 10]);
  const scale = useTransform(scrollY, [100, 1000], [1, 0.9]);
  const y = useTransform(scrollY, [100, 1000], [0, -80]);
  const blur = useSpring(x, springEase);
  const blurMotionTemplate = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.div
      className="grid w-full max-w-screen-lg p-8 relative"
      style={{ filter: blurMotionTemplate, scale, y }}
    >
      <div className="absolute -top-24 -right-[20rem]">
        <Image src="/images/phone-idea.webp" width={900} height={900} alt='big ideas' />

      </div>
      <AnimateFromHidden show={!!!messages.length} animateOnMount={false}>
        <div className="mb-24 max-w-xl lg:max-w-3xl">
          <h1
            className={cn(
              headingStyles,
              "mb-8 text-cyan-900 md:text-5xl lg:text-8xl",
            )}
          >
            Act today,
            <br />
            Lead tomorrow
          </h1>
          <p className="max-w-md text-xl lg:text-2xl">
            <Balancer>Drive your digital engagement with AI</Balancer>
          </p>
        </div>
      </AnimateFromHidden>
      <div className="max-w-screen-lg">
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
                className="h-auto rounded-lg border bg-zinc-100/50 backdrop-blur-md px-6 py-6 text-left text-base text-zinc-800 shadow-md hover:bg-zinc-50/70"
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
    </motion.div>
  );
};

export default HeroChat;
