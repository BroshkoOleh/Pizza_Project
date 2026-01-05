import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { Variant } from "../components/shared/GroupVariants";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib/helpers/getAvailablePizzaSizes";
import { ProductVariation } from "../lib/prisma/generatedPrisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredientsIds: Set<string>;
  availableSizes: Variant[];
  currentVariationId?: string;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  addIngredient: (id: string) => void;
}

export const usePizzaOptions = (variations: ProductVariation[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredientsIds, { toggle: addIngredient }] = useSet(new Set<string>([]));

  const availableSizes = getAvailablePizzaSizes(type, variations);

  const currentVariationId = variations.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredientsIds,
    availableSizes,
    currentVariationId,
    setSize,
    setType,
    addIngredient,
  };
};
