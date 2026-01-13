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

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, deleteCartItem } = useCart();

  return (
    <Container className="mt-5">
      <HeadTitle text={"Placing an order"} className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-20">
        {/* LEFT SIDE  */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={items}
            updateItemQuantity={updateItemQuantity}
            deleteCartItem={deleteCartItem}
          />
          <CheckoutPersonalData />
          <CheckoutDelivery />
        </div>
        {/* RIGHT SIDE  */}
        <CheckoutSidebar totalAmount={totalAmount} />
      </div>
    </Container>
  );
}
