import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/shared/lib/prisma/db";
import { OrderStatus } from "@/shared/lib/prisma/generatedPrisma/enums";

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe environment variables are missing" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(intent);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
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

  console.log("Payment succeeded and cart was cleared for order:", existingOrder.id);
}

async function handleFailedPayment(intent: Stripe.PaymentIntent) {
  console.log("Payment failed:", intent.id);
}
