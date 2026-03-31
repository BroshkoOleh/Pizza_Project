"use client";

import { cn } from "@/shared/lib/utils";
import { Trash2Icon } from "lucide-react";
import { CartItemProps } from "@/shared/types";
import Image from "next/image";
import { CountButton } from "./CountButton";

interface Props extends CartItemProps {
  changeQuantityCartItem?: (type: "plus" | "minus") => void;
  removeCartItem?: () => void;
  className?: string;
}

export const CheckoutItem = ({
  imageUrl,
  details,
  name,
  price,
  quantity,
  changeQuantityCartItem,
  removeCartItem,
  disabled,
  className,
}: Props) => {
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-0 max-[500px]:flex-col max-[500px]:items-stretch",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <Image
          src={imageUrl}
          alt="cart item image"
          width={60}
          height={60}
          className="w-[60px] h-[60px] object-cover"
          priority
        />
        <div>
          <div className={cn("flex items-center justify-between", className)}>
            <h2 className="text-lg font-bold flex-1 leading-6 max-[500px]:text-base">{name}</h2>
          </div>
          {details.length > 0 && <p className="text-xs text-gray-400 w-[90%] max-[500px]:w-full">{details}</p>}
        </div>
      </div>
      <div className="flex items-center gap-5 max-[500px]:justify-center">
        <h2 className="font-bold">{price} $</h2>
        <div className="flex items-center gap-5">
          <CountButton onClick={changeQuantityCartItem} value={quantity} />
          <button type="button" onClick={removeCartItem}>
            <Trash2Icon className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};
