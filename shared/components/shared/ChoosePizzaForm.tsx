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
import { HeadTitle } from "./HeadTitle";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variations: ProductVariation[];
  loading?: boolean;
  isModal: boolean;
  onClickAddCart: (variationId: string, ingredients: string[]) => void;
}

export function ChoosePizzaForm({
  imageUrl,
  name,
  ingredients,
  variations,
  onClickAddCart,
  loading,
  isModal,
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
    <div className={cn(className, "flex flex-1 flex-col lg:flex-row")}>
      <div className="hidden order-2 my-4 sm:my-6 lg:my-0 lg:order-1 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:h-full">
        <PizzaImage imageUrl={imageUrl} size={size} />
      </div>
      <div className="order-1 w-full bg-[#f7f6f5] p-4 lg:order-2 lg:w-[490px] lg:p-7">
        {isModal ? (
          <DialogTitle className="font-extrabold mb-1">{name}</DialogTitle>
        ) : (
          <HeadTitle className="font-extrabold mb-1" text={name} />
        )}

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

        <div className="order-2 my-4 sm:my-6 lg:hidden">
          <PizzaImage imageUrl={imageUrl} size={size} />
        </div>

        <div className="bg-gray-50 p-4 sm:p-5 rounded-md h-auto sm:h-[350px] overflow-visible sm:overflow-auto sm:scrollbar mt-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredientsIds.has(ingredient.id)}
                className="w-full"
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="hidden h-[55px] px-10 text-base rounded-[18px] w-full mt-6 lg:flex"
        >
          Add to Cart for {totalPrice} $
        </Button>
      </div>
      <div className="order-3 p-4 pt-2 lg:hidden">
        <Button loading={loading} onClick={handleClickAdd} className="h-[55px] w-full rounded-[18px] px-10 text-base">
          Add to Cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
}
