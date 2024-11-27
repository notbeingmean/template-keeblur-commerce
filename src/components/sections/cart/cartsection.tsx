"use client";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import useCartItem from "@/hooks/useCart";
import React, { useState, useCallback } from "react";
import useDebounce from "@/hooks/useDebounce";
import { ProductType } from "@/lib/fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CartSectionProps = {
  products: ProductType;
};

export default function CartSection({ products }: CartSectionProps) {
  const router = useRouter();
  const { items, removeItem, updateItem } = useCartItem();
  const [updating, setUpdating] = useState<Record<string, boolean>>({});

  const findProduct = useCallback(
    (id: string) => {
      return products.find((p) => p.product_id === id);
    },
    [products]
  );

  const [debouncedItems] = useDebounce(items, 500);

  const handleRemoveItem = useCallback(
    async (cartItemId: string) => {
      setUpdating((prev) => ({ ...prev, [cartItemId]: true }));
      removeItem(cartItemId);
      setUpdating((prev) => ({ ...prev, [cartItemId]: false }));
    },
    [removeItem]
  );

  const totalItems = debouncedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = debouncedItems.reduce((sum, item) => {
    const product = findProduct(item.product_id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleQuantityChange = useCallback(
    async (productId: string, change: number) => {
      const item = items.find((i) => i.product_id === productId);
      if (!item) return;

      setUpdating((prev) => ({ ...prev, [productId]: true }));

      const newQuantity = item.quantity + change;

      updateItem(item.cart_id, item.cart_item_id, item.product_id, newQuantity);

      setUpdating((prev) => ({ ...prev, [productId]: false }));
    },
    [items, updateItem]
  );

  function onSummit() {
    if (totalItems === 0) {
      toast.error("ไม่มีสินค้าในตะกร้าของคุณ");
      return;
    }

    router.push("/cart/shipping-address");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {items.length > 0 ? (
              items.map((item) => {
                const product = findProduct(item.product_id);
                if (!product) return null;

                const isUpdating =
                  updating[item.product_id] || updating[item.cart_item_id];

                return (
                  <React.Fragment key={item.product_id}>
                    <div className="flex flex-col sm:flex-row gap-4 rounded-lg border p-4">
                      <Image
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover mx-auto sm:mx-0"
                        height="150"
                        src={
                          product.images.length > 0
                            ? product.images[0].imageUrl
                            : "/placeholder/200x200.svg"
                        }
                        width="150"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="font-medium text-center sm:text-left">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground text-center sm:text-left">
                              {product.description}
                            </p>
                            <p
                              className={cn(
                                "text-sm text-center sm:text-left",
                                product.stock > 0 && product.stock < 10
                                  ? "text-red-500"
                                  : "text-green-500"
                              )}
                            >
                              {product.stock > 0 && product.stock < 10
                                ? "สินค้าเหลือเพียง " + product.stock + " ชิ้น!"
                                : "สินค้าพร้อมส่ง"}
                            </p>
                          </div>
                          <div className="text-center sm:text-right mt-2 sm:mt-0">
                            <div className="font-medium">
                              {formatPrice(product.price)}
                            </div>
                            <div className="mt-2 flex items-center justify-center sm:justify-end gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  handleQuantityChange(item.product_id, -1)
                                }
                                disabled={item.quantity === 1 || isUpdating}
                              >
                                <MinusCircle
                                  className={`h-4 w-4 ${isUpdating ? "opacity-50" : ""}`}
                                />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  handleQuantityChange(item.product_id, 1)
                                }
                                disabled={
                                  item.quantity === product.stock || isUpdating
                                }
                              >
                                <PlusCircle
                                  className={`h-4 w-4 ${isUpdating ? "opacity-50" : ""}`}
                                />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-center sm:justify-start gap-4 text-sm">
                          <button
                            className={`text-blue-600 hover:underline ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => handleRemoveItem(item.cart_item_id)}
                            disabled={isUpdating}
                          >
                            ลบสินค้า
                          </button>
                          <button className="text-blue-600 hover:underline">
                            เพิ่มไปยังรายการโปรด
                          </button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div className="text-center text-muted-foreground">
                ไม่มีสินค้าในตะกร้าของคุณ
              </div>
            )}
            <div
              className={cn(
                "flex justify-between border-t pt-4",
                items.length >= 0 && "hidden"
              )}
            >
              <div>{totalItems} ชิ้น</div>
              <div className="font-medium">{formatPrice(totalPrice)}</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-medium">สรุปรายการคำสั่งซื้อ</h2>
            <div className="mt-4 space-y-4">
              {/* <div className="flex flex-col sm:flex-row gap-2">
                <Input className="flex-1" placeholder="ใส่ส่วนลดของคุณ" />
                <Button className="w-full sm:w-auto">ตกลง</Button>
              </div> */}
              {/* <div className="flex justify-between">
                <span>ค่าส่ง</span>
                <span>TBD</span>
              </div>
              <div className="flex justify-between">
                <span>ส่วนลด</span>
                <span>$0</span>
              </div> */}
              {/* <div className="flex justify-between">
                <span>ภาษีมูลค่าเพิ่ม</span>
                <span>TBD</span>
              </div> */}
              <div className="flex justify-between border-t pt-4 font-medium">
                <span>ราคารวม</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                รายการคำสั่งซื้อของคุณจะถูกส่งไปยังที่อยู่ที่คุณเลือกในขั้นตอนถัดไป
                หากคุณต้องการเปลี่ยนแปลงที่อยู่ คุณสามารถทำได้ในหน้าการชำระเงิน
              </div>
              {/* <div className="text-sm text-muted-foreground">
                or 4 interest-free payments of ${(totalPrice / 4).toFixed(2)}{" "}
                with Afterpay
              </div> */}
              <Button
                className="w-full"
                size="lg"
                onClick={onSummit}
                disabled={totalItems === 0}
              >
                ชำระเงิน
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
