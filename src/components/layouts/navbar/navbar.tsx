import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //   navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Grid2x2, Search, ShoppingCart } from "lucide-react";

import IconInput from "@/components/ui/icon-input";
import { Button } from "@/components/ui/button";
// import Link from "next/link";

function Navbar() {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="flex justify-between items-center text-sm my-2 p-4 sticky top-0 z-10 bg-white ">
      <div className="flex items-center space-x-2">
        <h1 className="font-bold capitalize text-lg">keeblur</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center space-x-1">
                <Grid2x2 size={16} />
                <span>สินค้าทั้งหมด</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-28">
                  {arr.map((item) => (
                    <NavigationMenuLink key={item} className="">
                      <div className="hover:bg-zinc-100 p-1 rounded-md">
                        {item}
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-full max-w-xl">
        <IconInput
          icon={<Search className="h-4 w-4 " />}
          placeholder="ค้นหาสินค้า"
          className="w-full rounded-xl"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <ShoppingCart />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            38
          </span>
        </div>
        <Button>เข้าสู่ระบบ</Button>
      </div>
    </div>
  );
}

export default Navbar;
