"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { customizeColors, info } from "@/data/info";
import { cn } from "@/lib/utils";
import { PhoneCall, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopNavigation() {
  const { companyName, companyPhone, companyEmail, companyDescription } = info;
  const { bg } = customizeColors;

  const [language, setLanguage] = React.useState("th");

  return (
    <div className={cn("py-4 md:px-4", bg)}>
      <div className="container flex items-center justify-between text-white text-xs">
        <div className="flex items-center space-x-2">
          <div className="md:flex items-center space-x-2 hidden">
            <PhoneCall size={12} />
            <h4>{companyPhone}</h4>
          </div>
          <div className="md:flex items-center space-x-2 hidden">
            <Mail size={12} />
            <h4>{companyEmail}</h4>
          </div>
          <div />
          <h4 className="hidden sm:block">{companyDescription}</h4>
          <div className="capitalize font-bold sm:hidden text-lg ">
            <h1>{companyName}</h1>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="space-x-2 flex items-center">
              {language === "th" ? (
                <>
                  <Image
                    src="/thai-flag.svg"
                    width={20}
                    height={20}
                    alt="thailand"
                  />
                  <div className="flex items-center space-x-1">
                    <span>ไทย</span> <ChevronDown size={14} />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src="/us-flag.svg"
                    width={20}
                    height={20}
                    alt="thailand"
                  />
                  <div className="flex items-center space-x-1">
                    <span>Eng</span> <ChevronDown size={14} />
                  </div>
                </>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-24">
              <DropdownMenuItem onClick={() => setLanguage("th")}>
                <Image
                  src="/thai-flag.svg"
                  width={20}
                  height={20}
                  alt="thailand"
                />
                ภาษาไทย
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
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
  );
}

export default TopNavigation;
