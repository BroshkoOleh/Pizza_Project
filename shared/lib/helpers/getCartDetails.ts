import { CartDTO } from "@/shared/services/dto/cartDto";
import { calcCartItemTotalPrice } from "./calcCartItemTotalPrice";

export type CartStateItem = {
  id: string;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariation.product.name,
    imageUrl: item.productVariation.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariation.size,
    pizzaType: item.productVariation.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
