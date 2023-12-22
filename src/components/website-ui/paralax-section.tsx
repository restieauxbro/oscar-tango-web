"use client";

import React, { use, useRef } from "react";
import Image from "next/image";
import { ProfileForm } from "./contact-form";
import Balancer from "react-wrap-balancer";
import { motion, useScroll, useTransform } from "framer-motion";
import BlinderAnim from "../animations/BlinderAnim";

const ParalaxSection = () => {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  return (
    <section
      className="lg:md-20 relative grid min-h-lvh place-items-center overflow-clip bg-slate-800"
      ref={section}
      style={{ contain: "paint" }}
    >
      <motion.div
        className="h-[calc(100% + 180px)] preserve-3d absolute inset-0 -top-[180px] w-[120%] bg-purple-800"
        style={{ y }}
      >
        <Image
          src="/images/vackground-com-agUC-v_D1iI-unsplash.jpg"
          alt="texture"
          width={1920}
          height={1080}
          quality={100}
          className="h-full w-full scale-x-[-1] object-cover opacity-80"
          style={{ objectFit: "cover" }}
          loading="eager"
          placeholder="blur"
          blurDataURL={`/_next/image?url=https://oscartango.digital/images/vackground-com-agUC-v_D1iI-unsplash.jpg&w=16&q=2`}
        />
        <div className="noise-overlay absolute left-0 top-0 h-full w-full"></div>
      </motion.div>
      <div className="relative mx-auto w-screen max-w-screen-lg px-8 py-20 text-white lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-balance text-4xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            {`Leading with AI, so you can too`}
          </h2>
          {/* <div className="mt-8">
            <BlinderAnim
              text="Get in touch and tell us about your project, we'd love to hear from you."
              tag="p"
              className="text-base lg:text-lg max-w-sm"
            />
          </div> */}
        </div>
        <div className="ml-auto mr-0 mt-12 md:max-w-md lg:max-w-lg">
          <h3 className="mb-4 text-3xl opacity-70">{"Let's chat"}</h3>
          <ProfileForm />
        </div>
      </div>
    </section>
  );
};

export default ParalaxSection;
