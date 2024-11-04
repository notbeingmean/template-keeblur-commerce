"use client";

import { ShoppingCart, User, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import LoginDialog from "@/components/dialogs/login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AuthNavigation() {
  // eslint-disable-next-line no-unused-vars
  const { data } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();

    toast.success("ออกจากระบบสำเร็จ");
  }

  return (
    <div className="flex items-center space-x-4 ">
      <div className="relative hidden sm:block">
        <ShoppingCart />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          38
        </span>
      </div>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage src={data.user.image} />
              <AvatarFallback>{data.user.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>บัญชีของฉัน</DropdownMenuItem>
            <DropdownMenuItem>รายการคำสั่งซื้อ</DropdownMenuItem>
            <DropdownMenuItem>คูปองของฉัน</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginDialog />
      )}
    </div>
  );
}

export default AuthNavigation;
