import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Menu, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed w-full px-4 pt-4">
      <div className="flex justify-between">
        <div className="font-medium">Oscar Tango</div>
        <div></div>
        <div className="absolute left-0 hidden w-full place-items-center md:grid">
          <nav className="rounded-full bg-zinc-800 px-6 py-3 pl-8 text-white shadow-md">
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
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:bg-zinc-700">
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
