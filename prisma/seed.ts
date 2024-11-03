/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed Categories and Subcategories
  await prisma.category.create({
    data: {
      name: "สินค้าขายดี",
      slug: "best-sellers",
      products: {
        create: [
          {
            name: "QK65",
            price: 4000,
            description: "",
            stock: 10,
            slug: "qk65",
          },
          {
            name: "NEO65",
            price: 3600,
            description: "",
            stock: 10,
            slug: "neo65",
          },
        ],
      },
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "NEO75",
        price: 3600,
        description: "",
        stock: 10,
        slug: "neo75",
      },
      {
        name: "Keychron K6",
        price: 3000,
        description: "",
        stock: 999,
        slug: "keychron-k6",
      },
      {
        name: "Keychron K2",
        price: 3000,
        description: "",
        stock: 0,
        slug: "keychron-k2",
      },
      {
        name: "Keychron Q1",
        price: 5500,
        description: "",
        stock: 0,
        slug: "keychron-q1",
      },
    ],
  });

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
