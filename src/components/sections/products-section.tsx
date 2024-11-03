import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { customizeColors } from "@/data/info";
import Link from "next/link";

type ProductSectionProps = {
  title: string;
  description: string;
  products: number[];
  className?: string;
};

function ProductSection({
  title,
  description,
  products,
  className,
  ...props
}: ProductSectionProps & React.HTMLProps<HTMLDivElement>) {
  const { bg } = customizeColors;
  return (
    <div className={cn(className, "my-4")} {...props}>
      <div className={cn("py-8 rounded", bg)}>
        <div className="container text-white">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {products.map((item, index) => (
          <div key={index} className="p-4 rounded">
            <Image
              src="/placeholder/200x200.svg"
              width={200}
              height={200}
              alt=""
              className="object-cover w-full h-48 rounded "
            />
            <div className="my-2">
              <h2 className="text-sm ">ชื่อสินค้า</h2>
              <p className="text-sm font-bold">
                ฿ 1,000{" "}
                <span className="text-xs text-gray-400 line-through">
                  ฿ 1,500
                </span>
              </p>
              <Button className="mt-2 w-full" disabled={item % 2 == 0}>
                {item % 2 == 0 ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/products"
        className="col-span-2 md:col-span-5 flex items-center justify-center p-1 rounded bg-white text-black underline underline-offset-2"
      >
        ดูเพิ่มเติม
      </Link>
    </div>
  );
}

export default ProductSection;
