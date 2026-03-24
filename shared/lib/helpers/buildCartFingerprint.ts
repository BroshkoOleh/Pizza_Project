import crypto from "crypto";

export function buildCartFingerprint(
  items: Array<{
    productVariationId: string;
    quantity: number;
    ingredients: Array<{ id: string }>;
  }>
) {
  const normalizedItems = items
    .map((item) => ({
      productVariationId: item.productVariationId,
      quantity: item.quantity,
      ingredientIds: item.ingredients.map((ingredient) => ingredient.id).sort(),
    }))
    .sort((a, b) => {
      if (a.productVariationId !== b.productVariationId) {
        return a.productVariationId.localeCompare(b.productVariationId);
      }

      const aIngredients = a.ingredientIds.join(",");
      const bIngredients = b.ingredientIds.join(",");

      if (aIngredients !== bIngredients) {
        return aIngredients.localeCompare(bIngredients);
      }

      return a.quantity - b.quantity;
    });

  return crypto.createHash("sha256").update(JSON.stringify(normalizedItems)).digest("hex");
}