"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  User,
  ShoppingCart,
  Heart,
  Star,
  Receipt,
  LogOut,
  Map,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex space-x-2 lg:flex-col lg:space-x-0 ", className)}
      {...props}
    >
      {items.map((item) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-2  px-2 py-3  font-medium hover:bg-accent ",
              pathname === item.href ? "bg-accent" : "text-zinc-800"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
          <Separator />
        </React.Fragment>
      ))}
    </nav>
  );
}

export const sidebarItems = [
  {
    href: "/account",
    title: "บัญชีของฉัน",
    icon: <User className="h-4 w-4" />,
  },
  {
    href: "/account/orders",
    title: "รายการคำสั่งซื้อ",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    href: "/account/wishlist",
    title: "รายการสินค้าที่สนใจ",
    icon: <Heart className="h-4 w-4" />,
  },
  //   {
  //     href: "/vouchers",
  //     title: "คูปองของฉัน",
  //     icon: <Receipt className="h-4 w-4" />,
  //   },
  {
    href: "/logout",
    title: "ออกจากระบบ",
    icon: <LogOut className="h-4 w-4" />,
  },
];
