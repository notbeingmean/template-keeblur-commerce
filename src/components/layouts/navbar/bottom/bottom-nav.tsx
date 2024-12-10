"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { sidebarItems } from "../../sidebar/sidebar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { data, error, isPending } = authClient.useSession();
  return (
    <div className="sm:hidden fixed bottom-0 left-0 p-6 border w-full bg-white">
      <div className="flex items-center justify-around text-xs">
        {menu.map((item, index) =>
          item.title !== "บัญชี" ? (
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
          ) : (
            <React.Fragment key={index}>
              <Drawer>
                <DrawerTrigger
                  className={cn(
                    "flex flex-col items-center space-y-1 w-full max-w-sm",
                    pathname === item.href && "text-blue-500"
                  )}
                >
                  {item.icon}
                  <span className="xs:hidden">{item.title}</span>
                </DrawerTrigger>
                <DrawerContent className="p-4">
                  <DrawerHeader className="text-left ">
                    <DrawerTitle className="">
                      {isPending ? (
                        <div className="flex items-center space-x-2">
                          <Skeleton className=" w-14 h-14 rounded-full" />
                          <div className="space-y-1 w-1/4">
                            <Skeleton className=" w-1/2 h-4 " />
                            <Skeleton className=" w-full h-4 " />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={data?.user.image as string} />
                            <AvatarFallback>
                              <User />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-zinc-400">สวัสดี</p>
                            <p className="font-semibold">{data?.user.name}</p>
                          </div>
                        </div>
                      )}
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    {sidebarItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-2 py-3 font-medium hover:bg-accent"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}

export default BottomNavigation;
