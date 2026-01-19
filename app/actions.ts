"use server";

import { CheckoutFormValues } from "@/shared/constants/checkoutFormSchema";
import prisma from "@/shared/lib/prisma/db";
import { OrderStatus } from "@/shared/lib/prisma/generatedPrisma/enums";
import { cookies } from "next/headers";
import { generatePayOrderEmail } from "@/shared/lib/emailTemplates/generatePayOrderEmail";
import { sendOrderEmail } from "@/shared/lib/helpers/sendOrderEmail";
export async function createOrder(data: CheckoutFormValues) {
  console.log(data);

  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariation: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart is not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    // TODO: Make payment link creation
    const paymentUrl = "http://localhost:3000";

    // Sending email via Brevo
    const htmlContent = generatePayOrderEmail({
      orderId: order.id,
      totalAmount: order.totalAmount,
      address: data.address,
      phone: data.phone,
      firstName: data.firstName,
      paymentUrl,
    });
    await sendOrderEmail({
      orderId: order.id,
      firstName: data.firstName,
      email: data.email,
      htmlContent,
    });
    return "http://localhost:3000";
  } catch (error) {
    console.log(error);
  }
}
