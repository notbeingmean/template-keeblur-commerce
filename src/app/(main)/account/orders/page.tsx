import PageHeader from "@/components/layouts/page-header";
import { sidebarItems, SidebarNav } from "@/components/layouts/sidebar/sidebar";
import OrderTable from "@/components/sections/account/ordersection";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/signin");
  }

  const data = await db.order.findMany({
    where: {
      user_id: session.user.id,
    },
  });

  return (
    <div>
      <PageHeader
        // title="รายการโปรด"
        links={[
          { name: "หน้าแรก", url: "/" },
          { name: "บัญชีผู้ใช้", url: "/account" },
          { name: "รายการคำสั่งซื้อ", url: "/account/orders", isLast: true },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-4">
        <SidebarNav
          items={sidebarItems}
          className="w-full max-w-lg hidden md:block"
        />

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold">รายการคำสั่งซื้อ</h2>
          <p className="text-sm text-zinc-500">
            รายการคำสั่งซื้อทั้งหมดของคุณ สามารถคลิกเพื่อดูรายละเอียด
          </p>
          <OrderTable orders={data} />
        </div>
      </div>
      <div className="h-60"></div>
    </div>
  );
}

export default OrdersPage;
