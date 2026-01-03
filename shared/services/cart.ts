import { CartDTO } from "./dto/cartDto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>("/cart");
  return data;
};

export const updateItemQuantity = async (
  cartItemId: string,
  quantity: number
): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(`/cart/${cartItemId}`, { quantity });
  return data;
};
