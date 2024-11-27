import PageHeader from "@/components/layouts/page-header";
import { sidebarItems, SidebarNav } from "@/components/layouts/sidebar/sidebar";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import React from "react";

async function OrdersDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/signin");
  }

  const { id } = await params;

  const data = await db.order.findUnique({
    where: {
      order_id: id,
    },
    include: {
      orderDetail: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

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

        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold">
            รายการคำสั่งซื้อ #{data.order_id}
          </h2>

          <div className="text-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="mb-4 md:mb-0">
                <p className="font-semibold">วันที่สั่งซื้อ</p>
                <p>
                  {data.orderDate.toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-semibold">ยอดสุทธิ</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(data.totalAmount)}
                </p>
                <p className="text-sm text-gray-500">(รวมภาษีมูลค่าเพิ่ม)</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">สถานะ</p>
              <p>
                {(() => {
                  switch (data.status) {
                    case "pending":
                      return "รอดำเนินการ";
                    case "processing":
                      return "กำลังดำเนินการ";
                    case "completed":
                      return "ดำเนินการเสร็จสิ้น";
                    case "cancelled":
                      return "ยกเลิก";
                    case "paid":
                      return "ชำระเงินแล้ว";
                    default:
                      return "ไม่ทราบสถานะ";
                  }
                })()}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t pt-4">
              {data.orderDetail.map((order, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    {order.product.images.length > 0 ? (
                      <Image
                        src={order.product.images[0].imageUrl}
                        alt={order.product.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                    ) : (
                      <Image
                        src={"/placeholder/400x400.svg"}
                        alt={order.product.name}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                    )}

                    <div>
                      <p className="font-semibold">{order.product.name}</p>
                      <p className="text-sm text-gray-500">
                        จำนวน : {order.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-bold">
                      {formatPrice(order.product.price * order.quantity)}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-60"></div>
    </div>
  );
}

export default OrdersDetailPage;
