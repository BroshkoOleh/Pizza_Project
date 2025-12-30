export const mapPizzaSize = {
  20: "Little",
  30: "Middle",
  40: "Large",
} as const;

export const mapPizzaType = {
  1: "traditional",
  2: "thin",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({ value, name }));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({ value, name }));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;
