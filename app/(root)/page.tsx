import prisma from "@/shared/lib/prisma/db";
import {
  Container,
  HeadTitle,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/shared/components/shared/index";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          variation: true,
        },
      },
    },
  });

  console.log(categories);

  return (
    <>
      <Container className="mt-10">
        <HeadTitle text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          {/* Filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* the list of goods */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}

              {/* <ProductsGroupList title="Pizzas" products={products} categoryId={1} />
              <ProductsGroupList title="Combos" products={products} categoryId={2} /> */}
            </div>
            {/* 
            <div className="flex items-center gap-6 mt-12">
              <Pagination pageCount={3} />
              <span className="text-sm text-gray-400">5 из 65</span>
            </div> */}
          </div>
        </div>
      </Container>
    </>
  );
}
