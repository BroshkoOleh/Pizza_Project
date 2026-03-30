import prisma from "@/shared/lib/prisma/db";
import {
  Container,
  HeadTitle,
  TopBar,
  Filters,
  ProductsGroupList,
  MobileFiltersDrawer,
} from "@/shared/components/shared/index";
import { Suspense } from "react";
import { findPizzas } from "@/shared/lib/helpers";
import { GetSearchParams } from "@/shared/lib/helpers/findPizzas";

interface Props {
  searchParams: Promise<GetSearchParams>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const categories = await findPizzas(params);
  // const categories = await prisma.category.findMany({
  //   include: {
  //     products: {
  //       include: {
  //         ingredients: true,
  //         variation: true,
  //       },
  //     },
  //   },
  // });

  return (
    <>
      <Container className="mt-10 px-4 sm:px-6">
        <HeadTitle text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />

      <Container className="mt-10 pb-14 px-4 sm:px-6">
        <div className="mb-6 md:hidden">
          <MobileFiltersDrawer />
        </div>
        <div className="flex gap-20">
          {/* Filtration */}
          <div className="hidden w-[250px] shrink-0 md:block">
            <Suspense>
              <Filters />
            </Suspense>
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

            </div>

          </div>
        </div>
      </Container>
    </>
  );
}
