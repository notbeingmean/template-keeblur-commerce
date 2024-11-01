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

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <div className="bg-zinc-900 py-4 px-24">
        <div className="container flex items-center justify-between text-white text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <PhoneCall size={12} />
              <h4>099-999-9999</h4>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={12} />
              <h4>example@example.com</h4>
            </div>
            <div />
            <h4 className="">นึกถึง keeblur นึกถึงคียบอร์ด </h4>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="space-x-2 flex items-center">
                <Image
                  src="/thai-flag.svg"
                  width={20}
                  height={20}
                  alt="thailand"
                />
                <div className="flex items-center space-x-1">
                  <span>ไทย</span> <ChevronDown size={14} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-24">
                <DropdownMenuItem>
                  <Image
                    src="/thai-flag.svg"
                    width={20}
                    height={20}
                    alt="thailand"
                  />
                  ภาษาไทย
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Image
                    src="/us-flag.svg"
                    width={20}
                    height={20}
                    alt="thailand"
                  />
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ContainerWrapper>
        <Navbar />
        {children}
      </ContainerWrapper>
    </>
  );
}

export default MainLayout;
