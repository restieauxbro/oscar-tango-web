"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageExtended = (props: any) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      <div className="absolute left-0 top-0 h-full w-full">
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          animate={{
            opacity: loaded ? 0 : 1,
          }}
        >
          <Image
            onLoadingComplete={(img) => {
              props.onLoadingComplete && props.onLoadingComplete(img);
              setLoaded(true);
            }}
            {...props}
          />
        </motion.div>
      </div>
    </>
  );
};

export default ImageExtended;
