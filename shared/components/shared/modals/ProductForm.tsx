"use client";
import { useCartStore } from "@/shared/store";
import { Product } from "@/shared/types";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { ChooseProductForm } from "../ChooseProductForm";

interface Props {
  product: Product;
  isModal: boolean;
  className?: string;
  closeModal?: () => void;
}

export function ProductForm({ product, isModal, closeModal, className }: Props) {
  const firstItem = product.variation[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onAddProduct = async () => {
    try {
      await addCartItem({ productVariationId: firstItem.id });
      toast.success("The product was added to the cart successfully");
      closeModal?.();
    } catch (error) {
      toast.error("Failed to add the product to cart");
      console.error(error);
    }
  };
  const onAddPizza = async (productVariationId: string, ingredients: string[]) => {
    try {
      await addCartItem({ productVariationId, ingredients });
      toast.success("The Pizza was added to the cart successfully");
      closeModal?.();
    } catch (error) {
      toast.error("Failed to add  Pizza to the cart");
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variations={product.variation}
        onClickAddCart={onAddPizza}
        loading={loading}
        isModal={isModal}
      />
    );
  }
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onClickAddCart={onAddProduct}
      price={firstItem.price}
      loading={loading}
      isModal={isModal}
    />
  );
}
