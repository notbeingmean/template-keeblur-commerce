import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PhoneCall, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopNavigation() {
  return (
    <div className="bg-zinc-700 py-4 md:px-4">
      <div className="container flex items-center justify-between text-white text-xs">
        <div className="flex items-center space-x-2">
          <div className="md:flex items-center space-x-2 hidden">
            <PhoneCall size={12} />
            <h4>099-999-9999</h4>
          </div>
          <div className="md:flex items-center space-x-2 hidden">
            <Mail size={12} />
            <h4>example@example.com</h4>
          </div>
          <div />
          <h4 className="hidden sm:block">นึกถึง keeblur นึกถึงคียบอร์ด </h4>
          <h2 className="capitalize font-heading font-bold sm:hidden">
            keeblur
          </h2>
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
  );
}

export default TopNavigation;
