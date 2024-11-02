import React from "react";
import ContainerWrapper from "../wrappers/container";
import Navbar from "./navbar/navbar";
import { ChevronDown, Mail, PhoneCall } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import TopNavigation from "./navbar/top-nav";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <TopNavigation />
      <ContainerWrapper>
        <Navbar />
        {children}
      </ContainerWrapper>
    </>
  );
}

export default MainLayout;
