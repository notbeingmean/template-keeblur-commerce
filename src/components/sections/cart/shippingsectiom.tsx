"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { AddressType, ProductType } from "@/lib/fetch";
import useCartItem from "@/hooks/useCart";

import Link from "next/link";
import CreateAddressDialog from "@/components/dialogs/create-address";

type ShippingSectionProps = {
  addresses: AddressType;
  products: ProductType;
};

export default function ShippingSection({
  addresses,
  products,
}: ShippingSectionProps) {
  const {
    items,
    removeItem,
    updateItem,
    shippingMethod,
    setShippingMethod,
    addressId,
    setAddressId,
  } = useCartItem();

  const findProduct = useCallback(
    (id: string) => {
      return products.find((p) => p.product_id === id);
    },
    [products]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const product = findProduct(item.product_id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (totalItems === 0) {
    return (
      <div className="flex justify-center items-center h-96 flex-col">
        <p className="text-2xl">ไม่สามารถทำรายการต่อได้</p>
        <p>คุณไม่สามารถทำรายการต่อได้เนื่องจาก ไม่พบสินค้าในตะกร้าของคุณ</p>
      </div>
    );
  }

  return (
    <div className=" px-4 py-8 h-full">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>ที่อยู่ของฉัน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses?.map((address, index) => (
                <div
                  className={cn(
                    "border rounded p-4 text-sm cursor-pointer",
                    addressId === address.address_id && " bg-zinc-50"
                  )}
                  onClick={() => setAddressId(address.address_id)}
                  key={index}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{address.type}</h3>
                    <div className="flex items-center space-x-2 ">
                      <Pencil size={16} />
                      <Trash2 size={16} />
                    </div>
                  </div>

                  <p>{address.name}</p>
                  <p>{address.address}</p>
                  <p>{address.province}</p>
                  <p>{address.postalCode}</p>
                  <div
                    className={cn(
                      "mt-4 p-1 border rounded w-full max-w-[80px] text-center",
                      address.priority === 0 ? "block" : "hidden"
                    )}
                  >
                    ค่าเริ่มต้น
                  </div>
                </div>
              ))}

              <CreateAddressDialog />
            </CardContent>
          </Card>
          {/* <Card className="mt-6">
            <CardHeader>
              <CardTitle>วิธีการจัดส่ง</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={shippingMethod.type}
                onValueChange={(value) => {
                  if (value === "standard") {
                    setShippingMethod({ type: "standard", price: 100 });
                  }

                  if (value === "express") {
                    setShippingMethod({ type: "express", price: 200 });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">จัดส่งมาตรฐาน (3-5 วันทำการ)</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">จัดส่งด่วน (1-2 วันทำการ)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card> */}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>ราคาสินค้า</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{formatPrice(shippingMethod.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ส่วนลด</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between">
                  <span>ภาษีมูลค่าเพิ่ม</span>
                  <span>TBD</span>
                </div> */}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg">
                <Link href={"/payment"}>ดำเนินการต่อ</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
            ดำเนินการต่อ
          </Button> */}
        </div>
      </div>
    </div>
  );
}
