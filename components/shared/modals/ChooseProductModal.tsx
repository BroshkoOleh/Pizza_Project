"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Product } from "../../../types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../ChooseProductForm";
import { ChoosePizzaForm } from "../ChoosePizzaForm";

interface Props {
  product: Product;
  className?: string;
}

export function ChooseProductModal({ product, className }: Props) {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variation[0].pizzaType);

  console.log();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] sm:max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variation={product.variation}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
}
