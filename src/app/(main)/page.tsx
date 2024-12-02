import Banner from "@/components/banner";
import BlogSection from "@/components/sections/blogsection";
import HeroSection from "@/components/sections/herosection";
import ProductSection from "@/components/sections/products-section";

import { client } from "@/server/client";

export default async function Home() {
  const { data, error } = await client.api.products.get({
    query: {
      take: 5,
    },
  });

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <HeroSection />
      <ProductSection
        title="สินค้ามาใหม่"
        description="เลือกช้อปสินค้าใหม่ล่าสุดก่อนใครได้เลย"
        products={data}
      />
      <Banner
        title="บริการส่งด่วน 3 ชั่วโมง"
        description=" สำหรับลูกค้าในกรุงเทพและปริมณฑลผ่านช่องทาง LINE @shop"
        href="/"
      />
      <ProductSection
        title="สินค้าขายดี"
        description="สินค้าที่เราแนะนำให้คุณ"
        products={data}
      />
      <ProductSection title="สินค้า" description="สินค้า" products={data} />
      <BlogSection />
    </>
  );
}
