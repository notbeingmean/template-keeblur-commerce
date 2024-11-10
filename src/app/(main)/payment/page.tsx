import PageHeader from "@/components/layouts/page-header";

import PaymentSection from "@/components/sections/cart/paymentsection";
import { auth } from "@/lib/auth";
import { fetchProducts } from "@/lib/fetch";

import { headers } from "next/headers";

async function PaymentPage() {
  const data = await fetchProducts({ skip: 0 });
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <PageHeader
        links={[{ name: "ตะกร้าสินค้า", url: "/cart", isLast: true }]}
        title="ตะกร้าสินค้า"
      />

      <PaymentSection products={data} />
    </div>
  );
}

export default PaymentPage;
