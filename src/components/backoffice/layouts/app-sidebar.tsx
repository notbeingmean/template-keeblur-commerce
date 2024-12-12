"use client";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Grid2x2,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { customizeColors, info } from "@/data/info";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "หมวดหมู่",
    url: "#",
    icon: Grid2x2,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
const backofficeItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Users",
    url: "#",
    icon: User2,
  },
  {
    title: "Reports",
    url: "#",
    icon: ChevronDown,
  },
];

export function AppSidebar() {
  const { logo } = customizeColors;
  const { companyName } = info;
  const { data, error, isPending } = authClient.useSession();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <div className="m-2">
            <div
              className={cn(
                "font-bold capitalize text-lg   bg-clip-text text-transparent",
                logo
              )}
            >
              {companyName}
            </div>
            <p className="text-xs text-zinc-400">Backoffice</p>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>การจัดการ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {data?.user.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Settings /> <span>ตั้งค่า</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
