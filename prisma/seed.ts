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

  await prisma.product.create({
    data: {
      name: "Keychron K3",
      price: 3000,
      description: "",
      stock: 0,
      slug: "keychron-k3",
      productDetail: {
        create: {
          name: "Keychron K3",
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, odio at consectetur rutrum, magna orci commodo ante, ac viverra sapien mi sed felis. Sed tempor ultricies leo, id varius erat bibendum eget. Donec at nisl id justo iaculis euismod ut at elit. Suspendisse vehicula, mauris eget auctor egestas, enim risus accumsan dui, ut elementum neque mi vel erat. Fusce pharetra erat est, sit amet sollicitudin massa finibus eu. Maecenas id dolor congue, tincidunt libero ac, vestibulum mi. Sed nunc magna, mollis ac est bibendum, dictum tempor mi. Donec sodales egestas justo, nec accumsan elit malesuada id. Donec lobortis, felis nec sollicitudin ultricies, tortor elit pulvinar erat, ut tincidunt turpis erat at lorem. Suspendisse velit neque, placerat condimentum elit vitae, rutrum maximus diam. Nulla rhoncus rhoncus justo, ut hendrerit ex mollis nec. Ut urna diam, vehicula nec posuere eget, vestibulum vitae sem. Donec sollicitudin orci non sem viverra, quis laoreet odio consectetur. Integer auctor dolor ut ornare pulvinar. Donec ac vehicula quam.",
        },
      },
    },
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
