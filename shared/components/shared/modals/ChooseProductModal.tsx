"use client";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Product } from "../../../types";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "./ProductForm";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
  className?: string;
}

export function ChooseProductModal({ product, className }: Props) {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variation[0]?.pizzaType);
  const [open, setOpen] = useState(Boolean(product));

  useEffect(() => {
    setOpen(Boolean(product));
  }, [product]);

  const handleCloseModal = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleCloseModal();
        }
      }}
    >
      <DialogContent
        className={cn(
          isPizzaForm
            ? "w-screen max-w-none border-0 p-0 bg-white overflow-y-auto h-screen rounded-none sm:h-auto sm:w-[calc(100%-4rem)] sm:max-w-[860px] sm:max-h-[90vh] sm:rounded-lg sm:border lg:w-[1000px] lg:max-w-[1000px] lg:min-h-[500px] lg:max-h-[700px] xl:w-[1060px] xl:max-w-[1060px]"
            : "w-[calc(100%-1.5rem)] max-w-[460px] rounded-lg border bg-white p-0 max-h-[90vh] overflow-y-auto sm:w-[calc(100%-4rem)] sm:max-w-[860px] sm:min-h-[400px] sm:max-h-[90vh] lg:w-[1000px] lg:max-w-[1000px] lg:min-h-[500px] lg:max-h-[700px] xl:w-[1060px] xl:max-w-[1060px]",
          className
        )}
      >
        <ProductForm product={product} isModal={true} closeModal={handleCloseModal} />
      </DialogContent>
    </Dialog>
  );
}
