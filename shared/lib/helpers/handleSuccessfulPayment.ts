import "server-only";

import Stripe from "stripe";
import prisma from "@/shared/lib/prisma/db";
import { OrderStatus } from "@/shared/lib/prisma/generatedPrisma/enums";
import { generateSuccessfulPaymentEmail } from "@/shared/lib/emailTemplates/generateSuccessfulPaymentEmail";
import { sendOrderEmail } from "./sendOrderEmail";


export async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.orderId;
  
    if (!orderId) {
      console.error("Missing orderId in checkout session metadata:", session.id);
      return;
    }
  
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  
    if (!existingOrder) {
      console.error("Order not found for checkout session:", session.id);
      return;
    }
  
    if (existingOrder.status === OrderStatus.SUCCEEDED) {
      return;
    }
  
    const paymentIntentId =
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  
    const cart = await prisma.cart.findFirst({
      where: {
        token: existingOrder.token,
      },
    });
  
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: {
          id: existingOrder.id,
        },
        data: {
          status: OrderStatus.SUCCEEDED,
          paymentId: paymentIntentId ?? session.id,
        },
      });
  
      if (!cart) {
        return;
      }
  
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
  
      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          totalAmount: 0,
        },
      });
    });

  const firstName = existingOrder.fullName.split(" ")[0] || "Customer";
  const htmlContent = generateSuccessfulPaymentEmail({
    orderId: existingOrder.id,
    totalAmount: existingOrder.totalAmount,
    address: existingOrder.address,
    phone: existingOrder.phone,
    firstName,
  });

  await sendOrderEmail({
    orderId: existingOrder.id,
    firstName,
    email: existingOrder.email,
    subject: `Payment confirmed for order №${existingOrder.id}`,
    htmlContent,
  });
  
  console.log("Payment succeeded and cart was cleared for order:", existingOrder.id);
}