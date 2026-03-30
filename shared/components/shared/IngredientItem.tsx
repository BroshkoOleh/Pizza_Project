import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function IngredientItem({ imageUrl, name, price, active, onClick, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md",
        { "border border-primary": active },
        className
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}

      <Image src={imageUrl} alt="Ingredient" width={80} height={80} priority />

      <span className="text-xs mb-1">{name}</span>
      <span className=" font-bold">{price} $</span>
    </div>
  );
}
