import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutItem } from "../CheckoutItem";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib/helpers";
import { CartStateItem } from "@/shared/lib/helpers/getCartDetails";
import { CheckoutItemSkeleton } from "../CheckoutItemSkeleton";

interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
  updateItemQuantity: (id: string, quantity: number) => void;
  deleteCartItem: (id: string) => void;
}

export function CheckoutCart({
  items,
  updateItemQuantity,
  deleteCartItem,
  loading,
  className,
}: Props) {
  const handleQuantityCartItem = (id: string, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  return (
    <WhiteBlock title="1. Cart">
      <ul className="flex flex-col gap-5">
        {loading && [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)}
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize,
              item.ingredients
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            disabled={item.disabled}
            changeQuantityCartItem={(type) => handleQuantityCartItem(item.id, item.quantity, type)}
            removeCartItem={() => deleteCartItem(item.id)}
          />
        ))}
      </ul>
    </WhiteBlock>
  );
}
