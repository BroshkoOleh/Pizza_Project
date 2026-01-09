import prisma from "@/shared/lib/prisma/db";
import { notFound } from "next/navigation";
import { Container, ProductForm } from "@/shared/components/shared";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variation: true,
            },
          },
        },
      },
      variation: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} isModal={false} />
    </Container>
  );
}
