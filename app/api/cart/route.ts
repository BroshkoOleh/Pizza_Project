import prisma from "@/shared/lib/prisma/db";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { CreateCartItemValues } from "@/shared/services/dto/cartDto";
import { updateCartTotalAmount } from "@/shared/lib/helpers/updateCartTotalAmount ";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariation: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json({ message: "Failed to get product item from cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }
    let userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          token,
        },
      });
    }

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariationId: data.productVariationId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariationId: data.productVariationId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Failed to create the cart" }, { status: 500 });
  }
}
