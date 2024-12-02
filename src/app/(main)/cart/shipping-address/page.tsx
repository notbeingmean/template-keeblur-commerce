import PageHeader from "@/components/layouts/page-header";
import CartSection from "@/components/sections/cart/cartsection";
import PaymentSection from "@/components/sections/cart/paymentsection";
import ShippingSection from "@/components/sections/cart/shippingsectiom";
import { auth } from "@/lib/auth";
import { fetchAddress, fetchProducts } from "@/lib/fetch";

import { cn } from "@/lib/utils";
import { client } from "@/server/client";
import { headers } from "next/headers";

async function ShippingPage() {
  const data = await fetchProducts({ skip: 0 });
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  const addressData = await fetchAddress();

  if (!user) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
  }

  return (
    <div>
      <PageHeader
        links={[
          { name: "ตะกร้าสินค้า", url: "/cart" },
          { name: "ที่อยู่จัดส่ง", url: "/shipping-address", isLast: true },
        ]}
        title="ที่อยู่จัดส่ง"
      />
      <ShippingSection addresses={addressData} products={data} />
    </div>
  );
}

export default ShippingPage;
