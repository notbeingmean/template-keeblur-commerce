import PageHeader from "@/components/layouts/page-header";
import { ProductFilterSheet } from "@/components/products/product-filter-sheet";
import ProductFilterTag from "@/components/products/product-filter-tag";
import { fetchProducts, ProductType } from "@/lib/fetch";
import React from "react";
import ProductSort from "@/components/products/product-sort";
import ProductCard from "@/components/products/product-card";
import { notFound } from "next/navigation";
import Paginations from "@/components/products/pagination/pagination";

const ITEMS_PER_PAGE = 20;
type TSort = "low-to-high" | "high-to-low" | "name-asc" | "name-desc";

const sortProducts = (products: ProductType, sort: TSort) => {
  switch (sort) {
    case "low-to-high":
      return products.sort((a, b) => a.price - b.price);
    case "high-to-low":
      return products.sort((a, b) => b.price - a.price);
    case "name-asc":
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return products.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
};

const paginateProducts = (products: ProductType, currentPage: number) => {
  return products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
};

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  const sort = filters.sort as TSort;
  const products = await fetchProducts({
    category: filters.category as string[],
  });

  const sortedProducts = sortProducts(products, sort);
  const currentPage = parseInt(filters.page as string) || 1;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  if (currentPage > totalPages) {
    return notFound();
  }

  const paginatedProducts = paginateProducts(sortedProducts, currentPage);

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
          สินค้าทั้งหมด ({products.length} รายการ)
        </h4>
        <div className="flex justify-between">
          <div>
            <ProductFilterSheet />
            {Object.keys(filters).length > 0 &&
              !filters.sort &&
              !filters.page && <ProductFilterTag />}
          </div>
          <ProductSort />
        </div>
        <ProductCard products={paginatedProducts} />
        {totalPages > 1 && <Paginations products={sortedProducts} />}
      </div>
    </>
  );
}

export default ProductsPage;
