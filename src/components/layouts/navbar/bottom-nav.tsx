import { cn } from "@/lib/utils";
import {
  Grid2X2,
  Home,
  MessagesSquare,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
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
    icon: <Home />,
    href: "/",
  },
  {
    title: "หมวดหมู่",
    icon: <Grid2X2 />,
    href: "/categories",
  },
  {
    title: "แชท",
    icon: <MessagesSquare />,
    href: "/search",
  },
  {
    title: "รถเข็น",
    icon: <ShoppingCart />,
    href: "/cart",
  },
  {
    title: "บัญชี",
    icon: <User />,
    href: "/profile",
  },
];

function BottomNavigation() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 p-6 border w-full">
      <div className="flex items-center justify-around text-xs">
        {menu.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={cn("flex flex-col items-center space-y-1")}
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
