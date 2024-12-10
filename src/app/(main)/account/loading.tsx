import PageHeader from "@/components/layouts/page-header";
import { SidebarNav, sidebarItems } from "@/components/layouts/sidebar/sidebar";
import AccountSection from "@/components/sections/account/accountsection";
import { Circle } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div>
      <PageHeader
        // title="รายการโปรด"
        links={[{ name: "บัญชีผู้ใช้", url: "/account", isLast: true }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-4">
        <SidebarNav
          items={sidebarItems}
          className="w-full max-w-lg hidden md:block"
        />

        <div className="col-span-1 md:col-span-2 flex items-center justify-center">
          กำลังโหลด...
        </div>
      </div>
    </div>
  );
}

export default Loading;
