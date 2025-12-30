"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}

export function ChooseProductModal({ product, className }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={(cn("p-0 w-[1060px] min-h-[500px] bg-white overflow-hidden"), className)}
      >
        <DialogTitle>{product.name}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
