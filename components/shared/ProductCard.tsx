import Link from "next/link";
import { HeadTitle } from "./index";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Ingredients } from "../../types";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredients[];
  className?: string;
}

export const ProductCard = ({ id, name, price, imageUrl, ingredients, className }: Props) => {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Link href={`/product/${id}`} className="flex flex-col h-full">
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] shrink-0">
          <Image width={215} height={215} src={imageUrl} alt={name} />
        </div>

        <HeadTitle text={name} size="sm" className="mb-1 mt-3 font-bold shrink-0" />

        <p className="text-sm text-gray-400 grow">
          {ingredients.length > 0 && ingredients.map((ingredient) => ingredient.name).join(", ")}
        </p>

        <div className="flex justify-between items-center mt-2 shrink-0">
          <span className="text-[20px]">
            from <b>{price} $</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
