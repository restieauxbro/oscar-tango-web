'use client'

import * as React from "react"
import { MutableRefObject } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { AnimationControls, motion, useAnimationControls } from "framer-motion"

import { cn } from "@/lib/utils"
import AnimateFromHidden from "../animations/AnimateFromHidden"
import LoadingSpinner from "./loading-spinner"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none ring-2 ring-transparent focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-[0.2rem] disabled:opacity-50 dark:focus-visible:ring-slate-400 disabled:pointer-events-none dark:focus-visible:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:hover:text-slate-900",
        primary:
          "bg-green-500 dark:bg-green-600 text-white dark:text-white hover:bg-green-700 dark:hover:bg-green-700 dark:hover:text-white data-[state=open]:bg-green-600 focus-visible:ring-green-500",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-300 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-slate-100",
        subtle:
          "bg-slate-150 text-slate-900 hover:bg-slate-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-50 dark:hover:bg-zinc-600",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-zinc-100 hover:bg-transparent dark:hover:bg-transparent",
        disabled:
          "bg-slate-200 text-slate-500 dark:bg-zinc-700 dark:text-zinc-400 pointer-events-none",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md text-xs",
        lg: "h-11 px-8 rounded-md text-base",
        icon: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    rippleClassName?: string
  }
>(({ className, variant, size, rippleClassName, ...props }, ref) => {
  const elementRef = React.useRef(null)
  const element = (ref || elementRef) as MutableRefObject<HTMLButtonElement>
  const { rippleAnimation, handleRipple } = useRippleAnimation(element)
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={element}
      {...props}
      onClick={(e) => {
        handleRipple(e)
        props.onClick?.(e)
      }}
    >
      {props.children}
      <RippleChild
        {...{
          className: rippleClassName,
          element,
          rippleAnimation,
        }}
      />
    </button>
  )
})
Button.displayName = "Button"

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading: boolean; loaderFill: string }
>(({ className, variant, size, loading, loaderFill, ...props }, ref) => {
  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      <div
        className={
          "flex items-center transition-opacity duration-200 " +
          (loading ? "opacity-0" : "opacity-100")
        }
      >
        {props.children}
      </div>

      <div className="absolute top-0 left-0 grid h-full w-full place-items-center">
        <AnimateFromHidden
          show={loading}
          transition={{ delay: 0.1 }}
          exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
        >
          <LoadingSpinner className="h-8 w-8" fill={loaderFill} />
        </AnimateFromHidden>
      </div>
    </Button>
  )
})
LoadingButton.displayName = "LoadingButton"

const RippleChild = ({
  className,
  element,
  rippleAnimation,
}: {
  className?: string
  element: MutableRefObject<HTMLButtonElement>
  rippleAnimation: AnimationControls
}) => {
  return element?.current ? (
    <motion.div
      className={cn(
        `pointer-events-none absolute h-32 w-32 rounded-full bg-slate-300/30 opacity-0`,
        className
      )}
      animate={rippleAnimation}
    />
  ) : null
}

const useRippleAnimation = (element: MutableRefObject<HTMLElement>) => {
  const rippleAnimation = useAnimationControls()

  const handleRipple = (e:any) => {
    // click position within element
    const { clientX, clientY } = e
    const { left, top, width, height } =
      element?.current?.getBoundingClientRect() || {}
    let absoluteX = clientX - left
    let absoluteY = clientY - top
    // if clientX and clientY are not within the element, set them to the center
    absoluteX = absoluteX < 0 ? element.current!.offsetWidth / 2 : absoluteX
    absoluteY = absoluteY < 0 ? element.current!.offsetHeight / 2 : absoluteY

    // check if width or height is bigger and return the bigger value
    const biggerEdge = width > height ? width : height
    const rippleSize = biggerEdge * 2

    rippleAnimation.set({
      scale: 0,
      left: absoluteX,
      top: absoluteY,
      x: "-50%",
      y: "-50%",
      width: rippleSize,
      height: rippleSize,
    })
    rippleAnimation
      .start({
        scale: 1,
        opacity: 1,
        transition: {
          opacity: { duration: 0.2 },
          scale: { duration: 0.4 },
        },
      })
      .then(() => {
        if (element.current)
          // check if element hasn't already been unmounted
          rippleAnimation.start({
            opacity: 0,
            transition: {
              duration: 0.4,
            },
          })
      })
  }
  return { handleRipple, rippleAnimation }
}

export { Button, LoadingButton, buttonVariants, useRippleAnimation }
