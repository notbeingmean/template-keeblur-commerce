import PageHeader from "@/components/layouts/page-header";
import ProductDetail from "@/components/products/product-detail";
import { fetchProduct } from "@/lib/fetch";
import { client } from "@/server/client";
import { notFound } from "next/navigation";
import React from "react";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchProduct(slug);
  if (!data) {
    return notFound();
  }
  return (
    <div>
      <PageHeader
        title=""
        links={[
          { name: "หน้าแรก", url: "/" },
          { name: "สินค้าทั้งหมด", url: "/products" },
          {
            name: data?.name as string,
            url: "/products/" + data?.slug,
            isLast: true,
          },
        ]}
      />
      <div>
        <ProductDetail product={data} />
      </div>
    </div>
  );
}

export default ProductPage;
