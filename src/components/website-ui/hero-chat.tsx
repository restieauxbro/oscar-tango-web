"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { headingStyles } from "@/components/ui/typography";
import AnimateFromHidden from "../animations/AnimateFromHidden";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import ChatUI from "../ui/chat-ui";
import BlinderAnim from "../animations/BlinderAnim";

const HeroChat = () => {
  const springEase = {
    stiffness: 200,
    damping: 20,
    restDelta: 0.001,
  };
  const section = useRef(null);

  const { scrollY } = useScroll({
    target: section,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollY, [500, 1000], [1, 0.9]);
  const y = useTransform(scrollY, [100, 1100], [0, 200]);

  const blurMotion = useTransform(scrollY, [200, 1000], [0, 10]);
  const blur = useSpring(blurMotion, springEase);
  const blurMotionTemplate = useMotionTemplate`blur(${blur}px)`;
  return (
    <>
      <motion.div
        className="relative grid w-full overflow-x-clip pt-16 md:pt-4"
        //   style={{ filter: blurMotionTemplate, scale }}
      >
        <div className="relative mx-auto w-screen max-w-screen-lg px-8 py-8">
          <AnimatePresence>
            {true && (
              <motion.div
                className="pointer-events-none absolute -right-52 -top-24 hidden md:block lg:right-[-20rem]"
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
              >
                <Image
                  src="/images/isometric-phone-1.png"
                  width={850}
                  height={850}
                  alt="big ideas"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimateFromHidden show={true} animateOnMount={false}>
            <div className="mb-12 max-w-xl lg:mb-16 lg:max-w-3xl">
              <h1
                className={cn(
                  headingStyles,
                  "mb-8 text-5xl font-extrabold text-cyan-900 sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl",
                )}
              >
                Act today,
                <br />
                lead tomorrow
              </h1>
              <div className="max-w-[22rem] text-slate-700 lg:text-lg xl:text-xl">
                <BlinderAnim
                  text="Transform your customer experience with artificial intelligence
                solutions"
                  tag="p"
                />
              </div>
            </div>
          </AnimateFromHidden>
          <div className="max-w-screen-md">
            <ChatUI inputPlaceholder="Get some initial advice" />
          </div>
          <div ref={section} />
        </div>
      </motion.div>
    </>
  );
};

export default HeroChat;
