import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { customizeColors, info } from "@/data/info";

import NavMenu from "./nav-menu";
import SearchInput from "./search-input";

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
      <div className="flex items-center space-x-4 ">
        <div className="relative hidden sm:block">
          <ShoppingCart />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            38
          </span>
        </div>
        <Button size="sm" className="hidden md:block">
          เข้าสู่ระบบ
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
