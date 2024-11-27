"use client";
import useWishlist from "@/hooks/useWishlist";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Image from "next/image";

function WishlistSection() {
  const { wishlists } = useWishlist();
  return (
    <div className="my-2">
      <Table>
        <TableCaption>
          รายการโปรดของฉันจำนวน {wishlists?.products.length} ชิ้น
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="flex items-center space-x-2">
              <ShoppingBasket size={16} />
              <h1> สินค้า</h1>
            </TableHead>
            <TableHead className="text-center ">ราคาต่อชิ้น (บาท)</TableHead>
            <TableHead className="text-center "></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wishlists?.products.map((wishlist) => (
            <TableRow key={wishlist.product_id}>
              <TableCell className="font-medium text-center flex space-x-2 items-center">
                {wishlist.images.length > 0 ? (
                  <Image
                    src={wishlist.images[0].imageUrl}
                    alt={wishlist.name}
                    width={80}
                    height={80}
                  />
                ) : (
                  <Image
                    src={"/placeholder/400x400.svg"}
                    alt={wishlist.name}
                    width={80}
                    height={80}
                  />
                )}
                <p>{wishlist.name}</p>
              </TableCell>
              <TableCell className="text-center text-sm font-medium ">
                {formatPrice(wishlist.price)}
              </TableCell>

              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  color="danger"
                  size="sm"
                  className="flex items-center justify-center"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>ลบ</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default WishlistSection;
