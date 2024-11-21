import PageHeader from "@/components/layouts/page-header";
import { ProductFilterSheet } from "@/components/products/product-filter-sheet";
import ProductFilterTag from "@/components/products/product-filter-tag";
import { fetchProducts } from "@/lib/fetch";

import React from "react";
import ProductSort from "@/components/products/product-sort";
import ProductCard from "@/components/products/product-card";
import { notFound } from "next/navigation";

import Paginations from "@/components/products/pagination/pagination";

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  const products = await fetchProducts({
    category: filters.category as string[],
  });

  let filterProducts;

  switch (filters.sort) {
    case "low-to-high":
      filterProducts = products.sort((a, b) => a.price - b.price);
      break;
    case "high-to-low":
      filterProducts = products.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filterProducts = products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filterProducts = products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      filterProducts = products;
  }
  const itemsPerPage = 20;
  const currentPage = parseInt(filters.page as string) || 1;
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (currentPage > totalPages) {
    return notFound();
  }

  return (
    <>
      <PageHeader
        links={[
          { name: "หน้าแรก", url: "/" },
          { name: "สินค้าทั้งหมด", url: "/products", isLast: true },
        ]}
        title="สินค้าทั้งหมด"
      />
      <div className="m-4">
        <h4 className="text-sm my-2">
          สินค้าทั้งหมด{" "}
          {/* <span className="font-bold">“ หูฟังไร้สาย & หูฟังบลูทูธ ” </span> */}
          ({products.length} รายการ)
        </h4>
        <div className="flex  justify-between">
          <div>
            <ProductFilterSheet />
            {Object.keys(filters).length > 0 &&
              !filters.sort &&
              !filters.page && <ProductFilterTag />}
          </div>
          <ProductSort />
        </div>
        <ProductCard products={paginatedProducts} />
        {totalPages > 1 && <Paginations products={filterProducts} />}
      </div>
    </>
  );
}

export default ProductsPage;
