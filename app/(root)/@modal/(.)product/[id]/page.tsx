import { ChooseProductModal } from "@/shared/components/shared";
import prisma from "@/shared/lib/prisma/db";
import { notFound } from "next/navigation";

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      ingredients: true,
      variation: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
