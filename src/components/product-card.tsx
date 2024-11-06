"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatPrice, ProductType } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type ProductCardProps = {
  products: ProductType;
};

export default function ProductCard({ products }: ProductCardProps) {
  const [hoveredProducts, setHoveredProducts] = useState<{
    [key: number]: number;
  }>({});

  const handleMouseEnter = (index: number, imageCount: number) => {
    if (imageCount > 1) {
      setHoveredProducts((prev) => ({
        ...prev,
        [index]: 1,
      }));
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredProducts((prev) => ({
      ...prev,
      [index]: 0,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((item, index) => (
        <div key={index} className="p-4 rounded-lg shadow-md bg-background">
          <div
            className="relative overflow-hidden rounded-md"
            onMouseEnter={() => handleMouseEnter(index, item.images.length)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Image
              src={
                item.images.length > 0
                  ? item.images[
                      item.images.length > 1 ? hoveredProducts[index] || 0 : 0
                    ].imageUrl
                  : "/placeholder/200x200.svg"
              }
              width={200}
              height={200}
              alt={item.name}
              className="object-cover w-full h-48 transition-all duration-300 ease-in-out hover:scale-110"
            />
            {item.images.length > 1 && (
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out hover:bg-opacity-10" />
            )}
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-sm font-medium text-foreground">{item.name}</h2>
            <p className="text-sm font-bold text-foreground">
              {formatPrice(item.price)}
            </p>
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={"/" + item.slug}
            >
              ดูสินค้า
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
