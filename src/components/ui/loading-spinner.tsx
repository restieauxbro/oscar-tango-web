import React from "react"
import Image from "next/image"
import { ClassValue } from "clsx"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const LoadingSpinner = ({
  className,
  fill,
}: {
  className?: ClassValue
  fill: ClassValue
}) => {
  return (
    <motion.div className={cn("flex h-10 w-10 items-center", className)}>
      <motion.div
        className="inline-block"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 6,
            type: "spring",
            stiffness: 70,
            damping: 25,
          }}
        >
          <SvgComponent className={fill} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LoadingSpinner

function SvgComponent({ className }: { className: ClassValue }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="200px"
      height="200px"
      className={`h-full w-full ${className}`}
    >
      <g
        className="ldl-scale"
        style={{
          transformOrigin: "50% 50%",
          transform: "rotate(0deg) scale(0.8, 0.8)",
        }}
      >
        <path
          fill="inherit"
          d="M50 92.5c-5.7 0-11.3-1.1-16.5-3.3-5.1-2.1-9.6-5.2-13.5-9.1-3.5-3.5-3.5-9.2 0-12.7s9.2-3.5 12.7 0c2.3 2.3 4.9 4 7.8 5.3 3 1.3 6.2 1.9 9.6 1.9s6.5-.6 9.6-1.9c2.9-1.2 5.6-3 7.8-5.3 2.3-2.3 4-4.9 5.3-7.8 1.3-3 1.9-6.2 1.9-9.6 0-3.3-.6-6.5-1.9-9.6-1.2-2.9-3-5.6-5.3-7.8-2.3-2.3-4.9-4-7.8-5.3-3-1.3-6.2-1.9-9.6-1.9-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9c5.7 0 11.3 1.1 16.5 3.3 5.1 2.1 9.6 5.2 13.5 9.1 3.9 3.9 7 8.4 9.1 13.5 2.2 5.2 3.3 10.8 3.3 16.5 0 5.7-1.1 11.3-3.3 16.5-2.1 5.1-5.2 9.6-9.1 13.5-3.9 3.9-8.4 7-13.5 9.1-5.3 2.3-10.9 3.4-16.6 3.4z"
          id="XMLID_2_"
        ></path>
      </g>
    </svg>
  )
}
