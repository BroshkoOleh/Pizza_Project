"use client";

import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./PizzaImage";
import { Button } from "../ui";
import { DialogTitle } from "@/shared/components/ui/dialog";
import { GroupVariants } from "./GroupVariants";
import {
  pizzaSizes,
  PizzaSize,
  pizzaTypes,
  PizzaType,
  mapPizzaType,
} from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { Ingredient, ProductVariation } from "@/shared/lib/generated/prisma/client";
import { IngredientItem } from "./IngredientItem";
import { useSet } from "react-use";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  variation: ProductVariation[];
  onClickAddCart?: VoidFunction;
}

export function ChoosePizzaForm({
  imageUrl,
  name,
  ingredients,
  variation,
  onClickAddCart,
  className,
}: Props) {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const textDetails = `${size} sm,  ${mapPizzaType[type]} pizza`;

  const pizzaPrice =
    variation.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredientsIds,
    });
  };

  const availblePizzas = variation.filter((item) => item.pizzaType === type);
  const availblePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availblePizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  useEffect(() => {
    const isAvaibleSize = availblePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availbleSize = availblePizzaSizes?.find((item) => !item.disabled);

    if (!isAvaibleSize && availbleSize) {
      setSize(Number(availbleSize.value) as PizzaSize);
    }
  }, [type]);

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle className="font-extrabold mb-1">{name}</DialogTitle>
        <p className="text-gray-400"> {textDetails} </p>

        <div className={cn(className, "flex flex-col gap-4 mt-5")}>
          <GroupVariants
            items={availblePizzaSizes}
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
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-6"
        >
          Add to Cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
}
