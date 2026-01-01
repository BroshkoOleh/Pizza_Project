import { ProductVariation } from "../prisma/generatedPrisma/client";
import { PizzaType, pizzaSizes } from "../../constants/pizza";
import { Variant } from "../../components/shared/GroupVariants";

export const getAvailablePizzaSizes = (
  type: PizzaType,
  variations: ProductVariation[]
): Variant[] => {
  const filteredPizzasByType = variations.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
