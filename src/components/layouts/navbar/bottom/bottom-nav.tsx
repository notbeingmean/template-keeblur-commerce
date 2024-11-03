"use client";

import { cn } from "@/lib/utils";
import {
  Grid2X2,
  Home,
  MessagesSquare,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type BottomMenuType = {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
};

const menu: BottomMenuType[] = [
  {
    title: "หน้าหลัก",
    icon: <Home size={16} />,
    href: "/",
  },
  {
    title: "หมวดหมู่",
    icon: <Grid2X2 size={16} />,
    href: "/categories",
  },
  {
    title: "แชท",
    icon: <MessagesSquare size={16} />,
    href: "/search",
  },
  {
    title: "รถเข็น",
    icon: <ShoppingCart size={16} />,
    href: "/cart",
  },
  {
    title: "บัญชี",
    icon: <User size={16} />,
    href: "/profile",
  },
];

function BottomNavigation() {
  const pathname = usePathname();
  return (
    <div className="sm:hidden fixed bottom-0 left-0 p-6 border w-full bg-white">
      <div className="flex items-center justify-around text-xs">
        {menu.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 w-full max-w-sm",
                pathname === item.href && "text-blue-500"
              )}
            >
              {item.icon}
              <span className="xs:hidden">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNavigation;
