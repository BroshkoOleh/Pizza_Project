import { WhiteBlock } from "../WhiteBlock";
import { CheckoutItemDetails } from "../CheckoutItemDetails";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../../ui";

interface Props {
  totalAmount: number;
  loading?: boolean;
  submitting?: boolean;
  className?: string;
}

export function CheckoutSidebar({ totalAmount, loading, submitting, className }: Props) {
  const TAX = 15;
  const DELIVERY_PRICE = 250;

  const taxPrice = (totalAmount * TAX) / 100;
  const totalPrice = totalAmount + taxPrice + DELIVERY_PRICE;
  return (
    <aside className="w-[450px]">
      <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total:</span>
          {loading ? (
            <Skeleton className="w-full h-11" />
          ) : (
            <span className="h-11 text-[32px] font-extrabold">{totalPrice}$</span>
          )}
        </div>

        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-400" />
              Cost of goods:
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} $`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-400" />
              Tax:
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${taxPrice} $`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-400" />
              Delivery
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} $`}
        />

        <Button
          loading={submitting}
          type="submit"
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Proceed to payment
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </aside>
  );
}
