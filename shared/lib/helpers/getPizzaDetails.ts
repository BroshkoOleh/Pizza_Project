import { calcTotalPizzaPrice } from "./calcTotalPizzaPrice";
import { Ingredient, ProductVariation } from "../prisma/generatedPrisma/client";
import { PizzaSize, PizzaType, mapPizzaType } from "../../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  variations: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<string>
) => {
  // get total price
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    variations,
    ingredients,
    selectedIngredientsIds
  );

  // note pizza details
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};
