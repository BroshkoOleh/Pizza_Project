import prisma from "@/lib/db";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@/lib/generated/prisma/client";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: string;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductVariationUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ua",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "useradmin@test.ua",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  const allCategories = await prisma.category.findMany();
  const categoryMap: Record<string, string> = {};
  allCategories.forEach((category) => {
    categoryMap[category.name] = category.id;
  });
  const productsWithCategories = products.map((product) => {
    const categoryId = categoryMap[product.categoryName];

    if (!categoryId) {
      console.warn(`Not found category "${product.categoryName}" for product: ${product.name}`);
    }

    return {
      name: product.name,
      imageUrl: product.imageUrl,
      categoryId: categoryId,
    };
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: productsWithCategories,
  });

  const categoriesPizzaId = allCategories
    ? allCategories.find((categories) => categories.name === "Pizzas")?.id
    : "";

  const allIngridients = await prisma.ingredient.findMany();

  if (!categoriesPizzaId) {
    throw new Error("Category 'Pizzas' not found");
  }

  const pizza1 = await prisma.product.create({
    data: {
      name: "Paperoni Fresh",
      imageUrl: "/pizzas/paperoni.webp",
      categoryId: categoriesPizzaId,
      ingredients: {
        connect: allIngridients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: "4 cheeses",
      imageUrl: "/pizzas/4-cheese.webp",
      categoryId: categoriesPizzaId,
      ingredients: {
        connect: allIngridients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Chorizo",
      imageUrl: "/pizzas/chorizo.webp",
      categoryId: categoriesPizzaId,
      ingredients: {
        connect: allIngridients.slice(10, 25),
      },
    },
  });

  await prisma.productVariation.createMany({
    data: [
      // Paperoni Fresh
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
      // 4 cheeses
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),
      // Chorizo
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
    ],
  });

  // others products
  const allProducts = await prisma.product.findMany();
  const allProductVariation = await prisma.productVariation.findMany();

  const AllProductIdWithoutPrice = allProducts.filter((product) =>
    allProductVariation.every((productItem) => productItem.productId !== product.id)
  );

  for (const product of AllProductIdWithoutPrice) {
    await prisma.productVariation.create({
      data: generateProductItem({ productId: product.id }),
    });
  }

  // cart

  const users = await prisma.user.findMany();
  for (const user of users) {
    await prisma.cart.createMany({
      data: [
        {
          userId: user.id,
          totalAmount: 0,
          token: `11111${user.fullName.toLowerCase().replace(/\s+/g, "")}`,
        },
      ],
    });
  }

  const carts = await prisma.cart.findMany();

  await prisma.cartItem.create({
    data: {
      productVariationId: allProductVariation[0].id,
      cartId: carts[0].id,
      quantity: 2,
      ingredients: {
        connect: allIngridients.slice(0, 5),
      },
    },
  });
}

async function down() {
  await prisma.cartItem.deleteMany({});

  await prisma.productVariation.deleteMany({});

  await prisma.cart.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.verificationCode.deleteMany({});

  await prisma.product.deleteMany({});

  await prisma.ingredient.deleteMany({});

  await prisma.category.deleteMany({});

  await prisma.user.deleteMany({});
}
async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
