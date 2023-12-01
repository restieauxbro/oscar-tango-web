"use client";
import {
  AnimationPlaybackControls,
  animate,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ScrollToEnlarge = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.03, 0.2], [0.9, 1]);
  const scale = useSpring(x, {
    stiffness: 200,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="relative -mt-24 mb-0 flex justify-center overflow-hidden rounded-t-[2.5rem] bg-cyan-800 preserve-3d"
      style={{ scale }}
    >
      <div className="absolute left-1/2 top-1 -translate-x-1/2 text-white">
        <ChevronDown />
      </div>
      <section ref={ref} className="text-white">
        <div className="grid min-h-screen place-content-center py-12 md:py-16  lg:py-20">
          <div className="px-8  sm:px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-medium sm:text-6xl lg:text-7xl">
                {`We are a lean digital agency that doesn't settle for conventional`}
              </h2>
            </div>
            <div className="ml-auto mr-0 mt-20 max-w-2xl">
              <h2 className="text-right text-3xl font-medium sm:text-4xl lg:text-5xl">
                {`What makes us different?`}
              </h2>
            </div>
          </div>

          <div className="grid w-screen max-w-screen-lg md:grid-cols-3 gap-4 pt-12 lg:pt-20 px-8">
            {[
              {
                title: "Personalized AI Strategies",
                image: "/images/ai-strategy.png",
                description:
                  "Custom AI solutions tailored to understand and meet your unique business needs.",
              },
              {
                title: "Data-Driven Insights",
                image: "/images/microscope.png",
                description:
                  "Leveraging data analytics for deeper customer insights and smarter decision-making.",
              },
              {
                title: "Customer-Centric Approach",
                image: "/images/customer-centric.png",
                description:
                  "We focus on creating exceptional digital experiences that truly resonate with your audiences.",
              },
            ].map((i) => (
              <div
                key={i.title}
                className="grid min-h-[18rem] rounded-lg border border-slate-400 p-8 pt-4 transition-colors hover:border-slate-300 hover:shadow-md"
              >
                <div className="grid justify-items-center">
                  <Image src={i.image} alt={i.title} width={230} height={230} />
                </div>
                <h3 className="mb-4 text-xl font-medium">{i.title}</h3>
                <p>{i.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ScrollToEnlarge;
