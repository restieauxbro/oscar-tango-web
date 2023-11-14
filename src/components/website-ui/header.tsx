import React from "react";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <header className="fixed w-full px-4 pt-4">
      <div className="flex justify-between">
        <div className="font-medium">Oscar Tango</div>
        <div>Search</div>
        <div className="absolute left-0 hidden w-full place-items-center md:grid">
          <nav>
            <ul className="flex gap-12">
              <li>
                <a href="#">Case studies</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Separator className="mt-4" />
    </header>
  );
};

export default Header;
