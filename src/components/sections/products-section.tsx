import React from "react";

import { cn } from "@/lib/utils";

import { customizeColors } from "@/data/info";
import Link from "next/link";
import ProductCard from "../products/product-card";
import { ProductType } from "@/lib/fetch";

type ProductSectionProps = {
  title: string;
  description: string;
  products: ProductType;
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
      <ProductCard products={products} />
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
