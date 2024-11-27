import { db } from "@/lib/prisma";

async function main() {
  const wishlist = await db.wishlist.update({
    where: {
      wishlist_id: "cm3se4ax90000l21ewx55k9p3",
    },
    data: {
      products: {
        disconnect: {
          product_id: "cm3r61fkr0002lljfbo2n84mu",
        },
      },
    },
  });

  console.log(wishlist);
}

main();
