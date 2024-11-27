"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

// Define the Order type
type Order = {
  status: string;
  order_id: string;
  totalAmount: number;
  orderDate: Date;
  user_id: string;
};

export default function OrderTable({ orders }: { orders: Order[] }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) =>
    statusFilter === "all" ? true : order.status === statusFilter
  );

  return (
    <div className="my-4">
      <div className="mb-4">
        <Select onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue placeholder="ทั้งหมด" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="pending">รอดำเนินการ</SelectItem>
            <SelectItem value="paid">ชำระเงินแล้ว</SelectItem>
            <SelectItem value="completed">ดำเนินการเสร็จสิ้น</SelectItem>
            <SelectItem value="cancelled">ยกเลิก</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>หมายเลขคำสั่งซื้อ</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>วันที่</TableHead>
            <TableHead>ราคารวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>
                <Link href={"/account/orders/" + order.order_id}>
                  {order.order_id}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "processing"
                        ? "bg-blue-200 text-blue-800"
                        : order.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                  }`}
                >
                  {(() => {
                    switch (order.status) {
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
                </span>
              </TableCell>
              <TableCell>
                {order.orderDate.toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>{formatPrice(order.totalAmount)}</TableCell>
            </TableRow>
          ))}
          {filteredOrders.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                ไม่พบรายการคำสั่งซื้อ
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
