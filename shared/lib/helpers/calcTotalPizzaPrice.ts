import { Ingredient, ProductVariation } from "../prisma/generatedPrisma/client";
import { PizzaSize, PizzaType } from "../../constants/pizza";

/**
 * Function for calculating the total price of a pizza
 *
 * @param type - dough type of the selected pizza
 * @param size - size of the selected pizza
 * @param variation - list of product variations
 * @param ingredients - list of available ingredients
 * @param selectedIngredients - set of selected ingredient IDs
 *
 * @returns number total price
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variation: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<string>
) => {
  const pizzaPrice =
    variation.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
