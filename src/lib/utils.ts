import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDev = () => {
  const VERCEL_URL = process.env.VERCEL_URL;
  const VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL;
  if (VERCEL_URL === "") return true;
  return VERCEL_BRANCH_URL?.includes("dev");
};
