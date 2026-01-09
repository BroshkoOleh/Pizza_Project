"use client";

import { PropsWithChildren, ReactNode, useEffect } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { getCartItemDetails } from "@/shared/lib/helpers";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CartDrawer = ({ className, children }: Props) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const deleteCartItem = useCartStore((state) => state.deleteCartItem);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityCartItem = (id: string, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
  // const totalAmount = 200;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col  pb-0 bg-[#F4F1EE] max-w-[800px] w-full">
        <SheetHeader>
          <SheetTitle>
            There are <span className="font-bold">{items.length} goods in the cart </span>
          </SheetTitle>
        </SheetHeader>
        {/* items */}

        <div className="  overflow-auto scrollbar flex-1">
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={
                item.pizzaSize && item.pizzaType
                  ? getCartItemDetails(
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                      item.ingredients
                    )
                  : ""
              }
              disabled={item.disabled}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              changeQuantityCartItem={(type) =>
                handleQuantityCartItem(item.id, item.quantity, type)
              }
              removeCartItem={() => deleteCartItem(item.id)}
            />
          ))}
        </div>

        <SheetFooter className=" bg-white p-8">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />{" "}
            </span>
            <span className="font-bold text-lg">{totalAmount} $</span>
          </div>

          <Link href="/checkout">
            <Button type="submit" className="w-full h-12 text-base">
              place an order
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
