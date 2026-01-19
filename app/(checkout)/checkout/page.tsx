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

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, deleteCartItem, loading } = useCart();

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

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
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
            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
