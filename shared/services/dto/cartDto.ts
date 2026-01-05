import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductVariation,
} from "../../lib/prisma/generatedPrisma/client";

export type CartItemDTO = CartItem & {
  productVariation: ProductVariation & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productVariationId: string;
  ingredients?: string[];
}
