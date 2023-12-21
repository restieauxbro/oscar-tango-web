"use client";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
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
            "absolute left-0 top-0 h-full w-[calc(50%-1.5rem)] bg-purple-500",
          )}
          animate={{
            opacity: title === image ? 1 : 0,
          }}
          key={i}
        >
          <div className="sticky top-0 h-lvh w-full">
            <Image
              src={imageUrl}
              layout="fill"
              alt="Knowledge base"
              className="h-screen w-full object-cover"
            />
          </div>
        </motion.div>
      ))}

      <h2 className="sticky top-[calc(100vh-2.6lh)] grid grid-cols-2 py-12 pl-4 text-6xl font-semibold text-cyan-50 sm:text-7xl md:text-8xl lg:text-9xl lg:leading-[0.8]">
        What <br /> we offer
      </h2>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-12 px-8">
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
  const inView = useInView(ref, { margin: "0px 300px -300px 0px" });
  useEffect(() => {
    if (inView) {
      setImage(title);
    }
  }, [inView]);

  return (
    <div className="mb-12 md:mb-[clamp(10rem,33lvh,30rem)]">
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
