"use client";

import { ShoppingCart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import LoginDialog from "@/components/dialogs/login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCartItem from "@/hooks/useCart";
import Link from "next/link";
import { useCallback } from "react";

function AuthNavigation() {
  const { data } = authClient.useSession();
  const { items, clearCart } = useCartItem();

  const handleSignOut = useCallback(async () => {
    try {
      // Sign out from auth
      await authClient.signOut();

      // Clear cart state and localStorage
      clearCart();
      localStorage.removeItem("cart-item-storage");

      // Show success message
      toast.success("ออกจากระบบสำเร็จ");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    }
  }, [clearCart]);

  return (
    <div className="flex items-center space-x-4">
      <Link href="/cart" className="relative hidden sm:block">
        <ShoppingCart />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer hidden sm:block">
              <AvatarImage src={data.user.image} alt={data.user.name} />
              <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              บัญชีของฉัน
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              รายการโปรด
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              รายการคำสั่งซื้อ
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              คูปองของฉัน
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
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
