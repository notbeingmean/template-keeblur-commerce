import PageHeader from "@/components/layouts/page-header";
import CartSection from "@/components/sections/cart/cartsection";
import { fetchProducts } from "@/lib/utils";
import { client } from "@/server/client";

async function CartPage() {
  const data = await fetchProducts({ skip: 0 });
  return (
    <div>
      <PageHeader
        links={[{ name: "ตะกร้าสินค้า", url: "/cart", isLast: true }]}
        title="ตะกร้าสินค้า"
      />
      <CartSection products={data} />
    </div>
  );
}

export default CartPage;
