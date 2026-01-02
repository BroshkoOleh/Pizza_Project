"use client";

import { PropsWithChildren, ReactNode } from "react";

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

interface Props {
  className?: string;
  children: ReactNode;
}

export const CartDrawer = ({ className, children }: Props) => {
  const totalAmount = 200;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col  pb-0 bg-[#F4F1EE] max-w-[800px] w-full">
        <SheetHeader>
          <SheetTitle>
            There are <span className="font-bold">3 goods in the cart </span>
          </SheetTitle>
        </SheetHeader>
        {/* items */}
        <div className="  overflow-auto scrollbar flex-1">
          <CartDrawerItem
            id={"1c8fb08d-57b5-4e37-a454-0af73ba90d78"}
            imageUrl={"/pizzas/paperoni.webp"}
            details={getCartItemDetails(2, 30, [
              { name: "Cheese crust" },
              { name: "Creamy mozzarella" },
              { name: "Cheddar and parmesan cheeses" },
              { name: "Spicy jalapeño pepper" },
              { name: "Tender chickens" },
            ])}
            name={"Paperoni Fresh"}
            price={302}
            quantity={1}
          />
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
