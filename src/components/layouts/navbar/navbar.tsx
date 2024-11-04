import React from "react";

import { cn } from "@/lib/utils";
import { customizeColors, info } from "@/data/info";

import NavMenu from "./nav-menu";
import SearchInput from "./search-input";
import AuthNavigation from "./auth-nav";

async function Navbar() {
  const { companyName } = info;
  const { logo } = customizeColors;

  return (
    <div className="flex justify-between items-center text-sm my-2 p-4 sticky top-0 z-10 bg-white ">
      <div className="flex items-center space-x-2">
        <h1
          className={cn(
            "font-bold capitalize text-lg sm:block hidden  bg-clip-text text-transparent",
            logo
          )}
        >
          {companyName}
        </h1>
        <NavMenu />
      </div>
      <SearchInput />
      <AuthNavigation />
    </div>
  );
}

export default Navbar;
