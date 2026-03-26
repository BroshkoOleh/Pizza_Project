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

  let existingSession: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>> | null = null;

  if (order.checkoutSessionId) {
    try {
      existingSession = await stripe.checkout.sessions.retrieve(order.checkoutSessionId);
    } catch (error) {
      console.error("Failed to retrieve checkout session in pay page:", error);
    }
  }

  if (existingSession?.status === "open" && existingSession.url) {
    redirect(existingSession.url);
  } else if (existingSession?.status === "expired") {
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.CANCELLED,
      },
    });

    return (
      <OrderStatusCard
        title="Order is expired"
        description="This order is no longer active. Please create a new order."
      />
    );
  }





  return (
    <OrderStatusCard
      title="Unable to start payment"
      description="Please try again later or contact support."
    />
  );
}


