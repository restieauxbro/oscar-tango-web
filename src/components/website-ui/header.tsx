"use client";
import React from "react";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import AnimateFromHidden from "../animations/AnimateFromHidden";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mode, setMode] = React.useState<"search" | "menu">("menu");
  return (
    <header className="fixed w-full px-4 pt-4">
      <div className="flex justify-between">
        <div className="font-medium">Oscar Tango</div>
        <div></div>
        <div className="absolute left-0 hidden w-full place-items-center md:grid">
          <nav className="relative rounded-full bg-zinc-800 px-6 py-3 pl-8 text-white shadow-md">
            <ul className="flex items-center gap-8">
              <li>
                <a href="#">Case studies</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <div
                className={cn(
                  "absolute right-0 flex w-full justify-end px-2",
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
                        className="w-full rounded-full bg-zinc-800 text-white focus:bg-zinc-800"
                        type="text"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-zinc-700"
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
      </div>
    </header>
  );
};

export default Header;
