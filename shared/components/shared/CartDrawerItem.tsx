import { cn } from "@/shared/lib/utils";
import React from "react";
import { Ingredient } from "@/shared/lib/prisma/generatedPrisma/client";
import { CountButton } from "./CountButton";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";

interface Props {
  id: string;
  imageUrl: string;
  details: string;
  //   ingredients: Ingredient[];
  name: string;
  price: number;
  quantity: number;
  className?: string;
}

export function CartDrawerItem({ id, imageUrl, details, name, price, quantity, className }: Props) {
  return (
    <div className={cn("flex bg-white p-5 gap-6 mb-2", className)}>
      <Image
        src={imageUrl}
        alt="cart item image"
        width={60}
        height={60}
        className="w-[60px] h-[60px] object-cover"
        priority
      />

      <div className="flex-1">
        {/* CartItemInfo */}
        <div>
          <div className={cn("flex items-center justify-between", className)}>
            <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details.length > 0 && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
        </div>
        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={(type) => console.log(type)} value={quantity} />
          <div className="flex items-center gap-3">
            <h2 className="font-bold">{price} $</h2>
            <Trash2Icon className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
