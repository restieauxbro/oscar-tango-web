import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = () => {
  const VERCEL_ENV = process.env.VERCEL_ENV;
  return VERCEL_ENV === "development" || VERCEL_ENV === "preview";
};
