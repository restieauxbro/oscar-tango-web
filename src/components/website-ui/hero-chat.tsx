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
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

const HeroChat = () => {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat();
  const springEase = {
    stiffness: 200,
    damping: 20,
    restDelta: 0.001,
  };
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [100, 1000], [1, 0.9]);
  const y = useTransform(scrollY, [100, 1100], [0, 200]);

  const blurMotion = useTransform(scrollY, [100, 1000], [0, 10]);
  const blur = useSpring(blurMotion, springEase);
  const blurMotionTemplate = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.div
      className="relative grid w-full max-w-screen-lg p-8"
      style={{ filter: blurMotionTemplate, scale }}
    >
      <AnimatePresence>
        {!(messages.length > 0) && (
          <motion.div
            className="pointer-events-none absolute hidden md:block -right-52 lg:right-[-20rem] -top-24"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <Image
              src="/images/isometric-phone-1.png"
              width={850}
              height={850}
              alt="big ideas"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimateFromHidden show={!!!messages.length} animateOnMount={false}>
        <div className="mb-24 max-w-xl lg:max-w-3xl">
          <h1
            className={cn(
              headingStyles,
              "mb-8 text-5xl text-cyan-900 sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl",
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
                className="h-auto rounded-lg border bg-zinc-100/50 px-6 py-6 text-left text-base text-zinc-800 shadow-md backdrop-blur-md hover:bg-zinc-50/70"
                onClick={() => {
                  setInput(suggestion.description);
                }}
              >
                <div>
                  <h2 className="mb-2 font-semibold">{suggestion.title}</h2>
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
