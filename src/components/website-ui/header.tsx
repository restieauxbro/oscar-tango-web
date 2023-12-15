"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useKeyPress } from "@/utils/hooks";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed z-10 w-full px-4 py-4">
      <div className="flex justify-between">
        <Link href={"/"} className="font-medium">
          {/* <div className="h-16 w-16 origin-top-left bg-cyan-600 p-2 text-sm leading-3 text-white">
            Oscar <br /> Tango
          </div> */}
          <Image src="/images/oscartango_logo.svg" alt="Oscar Tango" width={82} height={82} className="border border-slate-900 rounded-md bg-white/70" />
        </Link>
        <div></div>
      </div>
    </header>
  );
};

export default Header;

const Nav = () => {
  const [mode, setMode] = React.useState<"search" | "menu">("menu");
  const keyPressed = useKeyPress("Escape");
  useEffect(() => {
    if (keyPressed["Escape"]) {
      setMode("menu");
    }
  }, [keyPressed]);
  return (
    <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 pt-4 md:block">
      <nav className="relative rounded-full bg-slate-800 px-4 py-2 pl-6 text-white shadow-md">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/case-studies">Case Studies</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <div
            className={cn(
              "absolute right-0 flex w-full justify-end px-1",
              mode !== "search" && "pointer-events-none",
            )}
          >
            <AnimatePresence>
              {mode === "search" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <Input
                    className="w-full rounded-full border-none bg-zinc-800 text-white focus:bg-zinc-800"
                    type="text"
                    autoFocus
                    placeholder=" Search"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className=" hover:bg-zinc-800"
              onClick={() => setMode(mode === "menu" ? "search" : "menu")}
            >
              <Search size={20} />
            </Button>
            {/* <Button variant="ghost" size="icon">
          <Menu size={20} />
        </Button> */}
          </div>
        </ul>
      </nav>
    </div>
  );
};
