import { Ingredient } from "@/lib/generated/prisma/client";
import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAllIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getIngredients();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds };
};
