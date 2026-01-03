import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib/helpers";
import { CartStateItem } from "../lib/helpers/getCartDetails";
// import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Fetch cart items */
  fetchCartItems: () => Promise<void>;

  /* Update item quantity request */
  updateItemQuantity: (id: string, quantity: number) => Promise<void>;

  /* Add item to cart request */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addCartItem: (values: any) => Promise<void>;

  /* Remove item from cart request */
  removeCartItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: string, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {

  },

  addCartItem: async (values: CreateCartItemValues) => {

}));
