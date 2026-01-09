"use client";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Product } from "../../../types";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "./ProductForm";

interface Props {
  product: Product;
  className?: string;
}

export function ChooseProductModal({ product, className }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] sm:max-w-[1060px] min-h-[500px] max-h-[700px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} isModal={true} closeModal={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
}
