"use client";
import { cn } from "@/lib/utils";
import { useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const WhatWeOffer = () => {
  const [image, setImage] = useState<(typeof serviceItems)[number]["title"]>(
    "Custom Knowledge Bases",
  );
  return (
    <div className="relative min-h-screen">
      {imageItems.map(({ title, imageUrl }, i) => (
        <motion.div
          className={cn(
            "absolute left-0 top-0 hidden h-full w-[calc(50%-1.5rem)] bg-purple-500 opacity-0 md:block",
          )}
          animate={{
            opacity: title === image ? 1 : 0,
          }}
          key={i}
        >
          <div className="sticky top-0 h-lvh w-full">
            <Image
              src={imageUrl}
              priority={i === 0}
              layout="fill"
              alt="Knowledge base"
              className="h-screen w-full object-cover"
              placeholder="blur"
              blurDataURL={`/_next/image?url=https://oscartango.digital${imageUrl}&w=16&q=1`}
            />
          </div>
        </motion.div>
      ))}

      <h2 className="top-[calc(100vh-2.6lh)] grid pb-0 pl-4 pt-12 text-5xl font-semibold text-cyan-700 sm:text-7xl md:sticky md:grid-cols-2 md:pb-12 md:text-8xl md:text-cyan-50 lg:text-9xl lg:leading-[0.8]">
        What <br /> we offer
      </h2>
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-8 md:grid-cols-2">
        <div></div>
        <div className="mx-auto max-w-xl">
          {serviceItems.map((item, i) => (
            <OfferingItem
              key={i}
              title={item.title}
              description={item.description}
              image={image}
              setImage={setImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

const OfferingItem = ({
  title,
  description,
  image,
  setImage,
}: {
  title: ImageTitle;
  description: string;
  image: ImageTitle;
  setImage: React.Dispatch<React.SetStateAction<ImageTitle>>;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const inView = useInView(ref, { margin: "0px 300px -250px 0px" });
  useEffect(() => {
    if (inView) {
      setImage(title);
    }
  }, [inView]);

  return (
    <motion.div
      className={cn(
        "grid min-h-[70lvh] snap-start snap-always place-items-center py-12 transition-opacity",
        title === image ? "opacity-100" : "opacity-50",
      )}
      style={{ scale }}
    >
      <div>
        <h3
          className={cn(
            "mb-4 text-pretty text-3xl transition-colors duration-300 ease-in-out lg:text-4xl",
            title === image ? "text-cyan-700" : "text-neutral-600",
          )}
          ref={ref}
        >
          {title}
        </h3>
        <p className="text-pretty text-lg">{description}</p>
      </div>
    </motion.div>
  );
};

const serviceItems = [
  {
    title: "Custom Knowledge Bases",
    description:
      "We can create internal and external knowledge bases that streamline your data, making it easily accessible for customer service, sales, and automated systems.",
  },
  {
    title: "Enhanced Search",
    description:
      "Our semantic search tools understand natural language queries, ensuring more relevant and accurate search results for your products and content.",
  },
  {
    title: "Customized Digital Assistants",
    description:
      "We can design digital assistants tailored to comprehend your customer intentions and execute complex tasks, enhancing user interaction and efficiency.",
  },
  {
    title: "Bespoke AI Models",
    description:
      "We can help you create your own AI model, fine-tuned to perform specific, organisation-centric tasks accurately and efficiently.",
  },
  {
    title: "Data Summarisation",
    description:
      "We help in condensing large volumes of data, such as customer service transcripts or complex documents, into concise, actionable insights.",
  },
  {
    title: "Categorisation",
    description:
      "Our services include creating tailored taxonomies and mapping your content to these structures for more streamlined content management and retrieval.",
  },
] as const;

type ImageTitle = (typeof serviceItems)[number]["title"];
type ImageItems = Array<{
  imageUrl: string;
  title: ImageTitle;
}>;

const imageItems: ImageItems = [
  {
    imageUrl: "/images/knowledge-base.png",
    title: "Custom Knowledge Bases",
  },
  {
    imageUrl: "/images/enhanced-search.png",
    title: "Enhanced Search",
  },
  {
    imageUrl: "/images/customized-digital-assistants.png",
    title: "Customized Digital Assistants",
  },
  {
    imageUrl: "/images/bespoke-ai-models.png",
    title: "Bespoke AI Models",
  },
  {
    imageUrl: "/images/data-summarisation.png",
    title: "Data Summarisation",
  },
  {
    imageUrl: "/images/categorisation.png",
    title: "Categorisation",
  },
];
