import { Ingredient } from "../lib/prisma/generatedPrisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<{ ingredients: Ingredient[] }>(ApiRoutes.INGREDIENTS);

  return data.ingredients;
};
