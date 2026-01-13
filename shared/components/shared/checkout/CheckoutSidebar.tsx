import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { CheckoutItemDetails } from "../CheckoutItemDetails";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../../ui";

interface Props {
  className?: string;
  totalAmount: number;
}

export function CheckoutSidebar({ totalAmount, className }: Props) {
  const TAX = 15;
  const DELIVERY_PRICE = 250;

  const taxPrice = (totalAmount * TAX) / 100;
  const totalPrice = totalAmount + taxPrice + DELIVERY_PRICE;
  return (
    <aside className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total:</span>
          <span className="text-[32px] font-extrabold">{totalPrice}$</span>
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-400" />
              Cost of goods:
            </div>
          }
          value={totalAmount}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-400" />
              Tax:
            </div>
          }
          value={taxPrice}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-400" />
              Delivery
            </div>
          }
          value={DELIVERY_PRICE}
        />

        <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
          Proceed to payment
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </aside>
  );
}
