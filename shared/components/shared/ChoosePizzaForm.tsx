"use client";

import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./PizzaImage";
import { Button } from "../ui";
import { DialogTitle } from "@/shared/components/ui/dialog";
import { GroupVariants } from "./GroupVariants";
import { PizzaSize, pizzaTypes, PizzaType } from "@/shared/constants/pizza";

import { Ingredient, ProductVariation } from "../../lib/prisma/generatedPrisma/client";
import { IngredientItem } from "./IngredientItem";

import { getPizzaDetails } from "@/shared/lib/helpers";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variations: ProductVariation[];
  loading?: boolean;
  onClickAddCart: (variationId: string, ingredients: string[]) => void;
}

export function ChoosePizzaForm({
  imageUrl,
  name,
  ingredients,
  variations,
  onClickAddCart,
  loading,
  className,
}: Props) {
  const {
    size,
    type,
    selectedIngredientsIds,
    availableSizes,
    currentVariationId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variations);

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    variations,
    ingredients,
    selectedIngredientsIds
  );

  const handleClickAdd = () => {
    if (currentVariationId) {
      onClickAddCart(currentVariationId, Array.from(selectedIngredientsIds));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle className="font-extrabold mb-1">{name}</DialogTitle>
        <p className="text-gray-400"> {textDetails} </p>

        <div className={cn(className, "flex flex-col gap-4 mt-5")}>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[400px] overflow-auto scrollbar mt-4">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredientsIds.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6"
        >
          Add to Cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
}
