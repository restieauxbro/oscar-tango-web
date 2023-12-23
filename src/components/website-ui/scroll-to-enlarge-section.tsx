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
import BlinderAnim from "../animations/BlinderAnim";

const ScrollToEnlarge = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.03, 0.25], [0.9, 1]);
  const scale = useSpring(x, {
    stiffness: 200,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="preserve-3d relative -mt-24 mb-0 flex justify-center overflow-hidden rounded-t-[2.5rem] bg-gradient-to-br from-cyan-700 to-cyan-900"
      style={{ scale }}
    >
      <div className="absolute left-1/2 top-1 -translate-x-1/2 text-white">
        <ChevronDown />
      </div>
      <section ref={ref} className="text-white">
        <div className="grid min-h-screen place-content-center py-12 md:py-16  lg:py-[clamp(4rem,20lvh,8rem)]">
          <div className="mx-auto w-screen max-w-screen-lg px-8 sm:px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="text-3xl lg:text-4xl">We are</div>
              <h2 className="pl-6 text-6xl font-medium sm:text-7xl lg:pl-12 lg:text-8xl">
                {`Oscar Tango`}
              </h2>
            </div>
            <div className="ml-auto mr-0 mt-8 max-w-2xl md:mt-20">
              <BlinderAnim
                text="We're a forward-thinking digital agency, dedicated to developing smart, bespoke AI solutions tailored to your business needs. Our expertise lies in providing insightful guidance and cutting-edge strategies, propelling your business into the new digital era. Partner with us to fully leverage the transformative power of AI."
                tag="h3"
                className="text-lg sm:text-xl lg:text-2xl"
              />
            </div>
          </div>

          <div className="grid w-screen max-w-screen-xl gap-4 px-4 pt-12 md:grid-cols-3 lg:pt-20">
            {[
              {
                title: "Translating AI",
                image: "/images/ai-strategy.png",
                description:
                  "No jargon, just clear explanations tailored for everyone, technical or not.",
              },
              {
                title: "Customised AI",
                image: "/images/customization-in-ai.png",
                description:
                  "We listen, understand, and identify where AI can make a real difference in your organisation. It's about solutions that fit your specific needs.",
              },
              {
                title: "Data Readiness",
                image: "/images/data-readiness.png",
                description:
                  "We help organise your data to make it AI-compatible, ensuring the tools we develop are efficient and tailored to your business context.",
              },
              {
                title: "User and Brand Safety",
                image: "/images/safety-helmet.png",
                description:
                  "We tackle AI safety head-on, assessing risks and setting up safeguards to ensure responsible and secure use of AI for your business and your users.",
              },
              {
                title: "Exceptional Design",
                image: "/images/exceptional-design.png",
                description:
                  "Our designs aren't just about looks; they’re about creating user-friendly AI tools that align with your brand and customer needs.",
              },
              {
                title: "Driven by Data",
                image: "/images/customer-centric.png",
                description:
                  "We don’t just deploy AI solutions, we ensure your AI investment pays off with continuous monitoring and optimisation.",
              },
            ].map((i) => (
              <div
                key={i.title}
                className="grid min-h-[18rem] rounded-lg bg-cyan-500/10 p-8 pt-4"
              >
                <div className="relative grid justify-items-center">
                  <Image src={i.image} alt={i.title} width={230} height={230} />
                </div>
                <h3 className="mb-4 text-xl font-medium">{i.title}</h3>
                <p className="opacity-80">{i.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ScrollToEnlarge;
