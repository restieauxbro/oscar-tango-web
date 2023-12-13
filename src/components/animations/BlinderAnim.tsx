"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useWindowSize } from "react-use";
import { cn } from "@/lib/utils";

function calcLines(text: HTMLElement, tester: HTMLElement) {
  // Build an array of each word used in the original title
  var allWords = text.innerText.match(/\S+/g) || [];
  // The array we will fill with each line
  var lines = [];
  // The current line we are working on building
  var currentLine = "";

  // Work through the words until we're filling the correct amount of space
  for (var i = 0; i < allWords.length; i++) {
    // Build a new line and check if it is now too large for the container
    var newLine = currentLine + allWords[i] + " ";
    tester.innerText = newLine;
    if (tester.clientWidth > text.clientWidth) {
      // If the line is now larger, use the previous line (without the last added word) and reset the current line to just the last word
      lines.push(currentLine.trim());
      currentLine = allWords[i] + " ";
    } else {
      // If it's not long enough yet, just keep adding words
      currentLine = newLine;
    }
  }
  // Push any unfinshed final line to the array
  lines.push(currentLine.trim());
  return lines;
}

const BlinderAnim = ({
  text,
  tag,
  className,
}: {
  text: string;
  tag: "h1" | "h2" | "h3" | "p";
  className?: string;
}) => {
  const [titleLines, settitleLines] = useState([text]);
  const titleText = useRef<HTMLDivElement>(null);
  const tester = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 100px -100px 0px",
  });

  const { width } = useWindowSize();
  useEffect(() => {
    settitleLines(calcLines(titleText.current!, tester.current!));
  }, [width]);

  const tagElem = (line: string, i: number) => {
    switch (tag) {
      case "h1":
        return (
          <motion.h1
            className="title-line mb-4 text-6xl font-bold leading-none"
            variants={fadeUp}
            key={i}
          >
            {line}
          </motion.h1>
        );
      case "h2":
        return (
          <motion.h2
            className={cn("title-line", className)}
            variants={fadeUp}
            key={i}
          >
            {line}
          </motion.h2>
        );
      case "h3":
        return (
          <motion.h3
            className={cn("title-line", className)}
            variants={fadeUp}
            key={i}
          >
            {line}
          </motion.h3>
        );
      case "p":
        return (
          <motion.p
            className={cn("title-line", className)}
            variants={fadeUp}
            key={i}
          >
            {line}
          </motion.p>
        );
      default:
        return (
          <motion.p
            className={cn("title-line", className)}
            variants={fadeUp}
            key={i}
          >
            {line}
          </motion.p>
        );
    }
  };

  return (
    <div ref={ref}>
      <motion.div
        ref={titleText}
        variants={fastStagger}
        animate={isInView ? "animate" : "initial"}
      >
        {titleLines?.map((line, i) => (
          <div
            key={line}
            style={{ overflow: "hidden" }}
            className="blinder-cnt"
          >
            {tagElem(line, i)}
          </div>
        ))}
      </motion.div>
      <p
        className={cn("title-tester", className)}
        ref={tester}
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default BlinderAnim;

const easy = [0.6, 0.64, 0.33, 0.92];

const fastStagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0 },
};

const fadeUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: easy, duration: 0.5 },
  },
  exit: {
    opacity: 0,
  },
};
