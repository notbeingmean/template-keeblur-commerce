import PageHeader from "@/components/layouts/page-header";
import CartSection from "@/components/sections/cart/cartsection";
import PaymentSection from "@/components/sections/cart/paymentsection";
import { auth } from "@/lib/auth";
import { fetchProducts } from "@/lib/fetch";

import { cn } from "@/lib/utils";
import { headers } from "next/headers";

async function CartPage() {
  const data = await fetchProducts({ skip: 0 });
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="mb-24">
      <PageHeader
        links={[{ name: "ตะกร้าสินค้า", url: "/cart", isLast: true }]}
        title="ตะกร้าสินค้า"
      />

      <CartSection products={data} />
    </div>
  );
}

export default CartPage;
