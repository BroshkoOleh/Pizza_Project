"use client";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Product } from "../../../types";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../ChooseProductForm";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { useCartStore } from "@/shared/store";

interface Props {
  product: Product;
  className?: string;
}

export function ChooseProductModal({ product, className }: Props) {
  const router = useRouter();
  const firstItem = product.variation[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = async () => {
    try {
      await addCartItem({ productVariationId: firstItem.id });
    } catch (error) {
      console.error(error);
    }
  };
  const onAddPizza = async (productVariationId: string, ingredients: string[]) => {
    try {
      await addCartItem({ productVariationId, ingredients });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] sm:max-w-[1060px] min-h-[500px] max-h-[700px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variations={product.variation}
            onClickAddCart={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onClickAddCart={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
