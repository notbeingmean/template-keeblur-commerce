import PageHeader from "@/components/layouts/page-header";
import { sidebarItems, SidebarNav } from "@/components/layouts/sidebar/sidebar";
import AccountSection from "@/components/sections/account/accountsection";
import { authClient } from "@/lib/auth-client";
import { fetchAddress } from "@/lib/fetch";
import { db } from "@/lib/prisma";

import React from "react";

async function WishListPage() {
  const data = await fetchAddress();

  return (
    <div>
      <PageHeader
        // title="รายการโปรด"
        links={[
          { name: "หน้าแรก", url: "/" },
          { name: "บัญชีผู้ใช้", url: "/account", isLast: true },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-4">
        <SidebarNav
          items={sidebarItems}
          className="w-full max-w-lg hidden md:block"
        />

        <div className="col-span-1 md:col-span-2 ">
          <AccountSection addresses={data} />
        </div>
      </div>
    </div>
  );
}

export default WishListPage;
