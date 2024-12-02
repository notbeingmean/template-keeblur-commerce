import PageHeader from "@/components/layouts/page-header";
import { sidebarItems, SidebarNav } from "@/components/layouts/sidebar/sidebar";
import WishlistSection from "@/components/sections/account/wishlistsection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function WishListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/signin");
  }
  return (
    <div>
      <PageHeader
        // title="รายการโปรด"
        links={[
          { name: "หน้าแรก", url: "/" },
          { name: "บัญชีผู้ใช้", url: "/account" },
          { name: "รายการโปรด", url: "/account/wishlist", isLast: true },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-4">
        <SidebarNav
          items={sidebarItems}
          className="w-full max-w-lg hidden md:block"
        />

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold">รายการโปรด</h2>
          <p className="text-sm text-zinc-500">
            พื้นที่รวบรวมสินค้าที่ชอบจาก ... สู่มือคุณ
          </p>
          <WishlistSection />
        </div>
      </div>
      <div className="h-60"></div>
    </div>
  );
}

export default WishListPage;
