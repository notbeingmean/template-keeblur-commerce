"use client";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils";
import { customizeColors, info } from "@/data/info";

import NavMenu from "./nav-menu";
import SearchInput from "./search-input";
import AuthNavigation from "./auth-nav";
import Link from "next/link";
import useCartItem from "@/hooks/useCart";

function Navbar() {
  const { companyName } = info;
  const { logo } = customizeColors;
  const { fetchItems, items } = useCartItem();

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between items-center text-sm my-2 p-4 sticky top-0 z-10 bg-white ">
      <div className="flex items-center space-x-2">
        <Link
          href="/"
          className={cn(
            "font-bold capitalize text-lg sm:block hidden  bg-clip-text text-transparent",
            logo
          )}
        >
          {companyName}
        </Link>
        <NavMenu />
      </div>
      <SearchInput />
      <AuthNavigation />
    </div>
  );
}

export default Navbar;
