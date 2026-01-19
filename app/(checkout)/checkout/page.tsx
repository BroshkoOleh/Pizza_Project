"use client";
import {
  CheckoutCart,
  CheckoutDelivery,
  CheckoutPersonalData,
  CheckoutSidebar,
  Container,
  HeadTitle,
} from "@/shared/components/shared";

import { useCart } from "@/shared/hooks";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkoutFormSchema";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, deleteCartItem, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data);
    setSubmitting(true);
    const url = await createOrder(data);
    toast.success("The order was created successfully");

    if (url) {
      location.href = url;
    }
    try {
    } catch (error) {
      console.log("Failed to create the order:", error);
      toast.error("Failed to create the order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <HeadTitle text={"Placing an order"} className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-20">
            {/* LEFT SIDE  */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                updateItemQuantity={updateItemQuantity}
                deleteCartItem={deleteCartItem}
                loading={loading}
              />
              <CheckoutPersonalData className={loading ? "opacity-40 pointer-events-none" : ""} />
              <CheckoutDelivery className={loading ? "opacity-40 pointer-events-none" : ""} />
            </div>
            {/* RIGHT SIDE  */}
            <CheckoutSidebar totalAmount={totalAmount} loading={loading} submitting={submitting} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
