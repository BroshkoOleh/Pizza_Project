import { redirect } from "next/navigation";
import prisma from "@/shared/lib/prisma/db";
import { OrderStatus } from "@/shared/lib/prisma/generatedPrisma/enums";
import { stripe } from "@/shared/lib/stripe";
import {OrderStatusCard} from "@/shared/components/shared/checkout"

type Props = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ token?: string }>;
};

export default async function CheckoutPayPage({ params, searchParams }: Props) {
  const { orderId } = await params;
  const { token } = await searchParams;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order || !token || token !== order.token) {
    return <OrderStatusCard title="Order not found" description="This payment link is invalid." />;
  }

  if (order.status === OrderStatus.SUCCEEDED) {
    return (
      <OrderStatusCard
        title="Order already paid"
        description="Your order has already been paid. Thank you for your purchase."
      />
    );
  }

  if (order.status === OrderStatus.CANCELLED) {
    return (
      <OrderStatusCard
        title="Order is expired"
        description="This order is no longer active. Please create a new order."
      />
    );
  }

  if (order.checkoutSessionId) {
    try {
      const existingSession = await stripe.checkout.sessions.retrieve(order.checkoutSessionId);

      if (existingSession.status === "open" && existingSession.url) {
        redirect(existingSession.url);
      }
    } catch (error) {
      console.log("Failed to retrieve checkout session in pay page:", error);
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Order №${order.id}`,
          },
          unit_amount: Math.round(order.totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=1&order_id=${order.id}`,
    customer_email: order.email,
    metadata: {
      orderId: order.id.toString(),
    },
  });

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      checkoutSessionId: session.id,
    },
  });

  if (session.url) {
    redirect(session.url);
  }

  return (
    <OrderStatusCard
      title="Unable to start payment"
      description="Please try again later or contact support."
    />
  );
}


