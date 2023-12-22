"use client";

import React, { use, useRef } from "react";
import Image from "next/image";
import { ProfileForm } from "./contact-form";
import Balancer from "react-wrap-balancer";
import { motion, useScroll, useTransform } from "framer-motion";

const ParalaxSection = () => {
  const section = useRef(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  return (
    <section
      className="lg:md-20 min-h-lvh grid place-items-center relative overflow-clip bg-slate-800"
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
        />
      </motion.div>
      <div className="relative mx-auto w-screen max-w-screen-lg px-8 py-20 text-white lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium sm:text-4xl md:text-6xl lg:text-7xl">
            <Balancer>{`Leading with AI, so you can too`} </Balancer>
          </h2>
          {/* <div className="mt-8">
            <BlinderAnim
              text="Get in touch and tell us about your project, we'd love to hear from you."
              tag="p"
              className="text-base xl:text-lg"
            />
          </div> */}
        </div>
        <div className="ml-auto mr-0 mt-12 md:max-w-md lg:max-w-lg">
          <ProfileForm />
        </div>
      </div>
    </section>
  );
};

export default ParalaxSection;
