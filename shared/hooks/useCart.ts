import React from "react";
import { useCartStore } from "../store";
import { CartStateItem } from "../lib/helpers/getCartDetails";
import { CreateCartItemValues } from "../services/dto/cartDto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  error: boolean;
  updateItemQuantity: (id: string, quantity: number) => void;
  deleteCartItem: (id: string) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const deleteCartItem = useCartStore((state) => state.deleteCartItem);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);
  const items = useCartStore((state) => state.items);
  const error = useCartStore((state) => state.error);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return { totalAmount, items, loading, error, updateItemQuantity, deleteCartItem, addCartItem };
};
