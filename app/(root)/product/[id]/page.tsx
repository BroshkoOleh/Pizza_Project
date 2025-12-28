import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Container, ProductImage, HeadTitle, GroupVariants } from "@/components/shared";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findFirst({ where: { id } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <HeadTitle text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut provident laudantium
          </p>

          <GroupVariants
            selectedValue="2"
            items={[
              { name: "small", value: "1" },
              { name: "middle", value: "2" },
              { name: "large", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
