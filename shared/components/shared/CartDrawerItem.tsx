import { cn } from "@/shared/lib/utils";
import { CountButton } from "./CountButton";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { CartItemProps } from "@/shared/types";

interface Props extends CartItemProps {
  changeQuantityCartItem?: (type: "plus" | "minus") => void;
  removeCartItem?: () => void;
  className?: string;
}

export function CartDrawerItem({
  imageUrl,
  details,
  name,
  price,
  quantity,
  changeQuantityCartItem,
  removeCartItem,
  disabled,
  className,
}: Props) {
  console.log("[CartDrawerItem] disabled", disabled);
  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6 mb-2",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
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
          <CountButton onClick={changeQuantityCartItem} value={quantity} />
          <div className="flex items-center gap-3">
            <h2 className="font-bold">{price} $</h2>
            <Trash2Icon
              onClick={removeCartItem}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
