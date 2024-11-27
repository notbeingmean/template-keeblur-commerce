import PageHeader from "@/components/layouts/page-header";

import PaymentSection from "@/components/sections/cart/paymentsection";
import { auth } from "@/lib/auth";
import { fetchProducts } from "@/lib/fetch";

import { headers } from "next/headers";

async function PaymentPage() {
  const data = await fetchProducts();
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <PageHeader
        links={[
          { name: "ตะกร้าสินค้า", url: "/cart" },
          {
            name: "ที่อยู่จัดส่ง",
            url: "/cart/shipping-address",
          },
          { name: "ชำระเงิน", url: "/payment", isLast: true },
        ]}
        title="ชำระเงิน"
      />

      <PaymentSection products={data} />
    </div>
  );
}

export default PaymentPage;
