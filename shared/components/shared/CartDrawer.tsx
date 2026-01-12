"use client";

import { ReactNode, useState } from "react";

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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { getCartItemDetails } from "@/shared/lib/helpers";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

interface Props {
  className?: string;
  children: ReactNode;
}

export const CartDrawer = ({ className, children }: Props) => {
  const { totalAmount, items, updateItemQuantity, deleteCartItem } = useCart();

  const [redirecting, setRedirecting] = useState(false);

  const handleQuantityCartItem = (id: string, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          "flex flex-col  pb-0 bg-[#F4F1EE] max-w-[800px] w-full h-full",
          !totalAmount && "justify-center"
        )}
      >
        <>
          {totalAmount > 0 ? (
            <div className="flex flex-col h-full">
              <SheetHeader>
                <SheetTitle>
                  There are <span className="font-bold">{items.length} goods in the cart </span>
                </SheetTitle>
              </SheetHeader>
              <div className="  overflow-auto scrollbar flex-1">
                {items.map((item) => (
                  <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                      item.ingredients
                    )}
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
                  <Button
                    onClick={() => setRedirecting(true)}
                    loading={redirecting}
                    type="submit"
                    className="w-full h-12 text-base"
                  >
                    place an order
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </SheetFooter>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
                priority
              />
              <SheetTitle className="text-center font-bold my-2 h4 text-[22px] ">
                The cart is empty
              </SheetTitle>

              <p className="text-center text-neutral-500 mb-5">
                Add at least one pizza to complete the order
              </p>

              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Go back
                </Button>
              </SheetClose>
            </div>
          )}
        </>
      </SheetContent>
    </Sheet>
  );
};
