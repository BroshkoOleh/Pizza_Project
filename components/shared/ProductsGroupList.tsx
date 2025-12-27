"use client";

import React, { useEffect } from "react";
import { useRef } from "react";
import { useIntersection } from "react-use";

import { HeadTitle } from "./index";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { useCategoryStore } from "@/store/category";
import { Product } from "../../types";

interface Props {
  title: string;
  products: Product[];
  categoryId: string;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList = ({
  title,
  products,

  listClassName,
  categoryId,
  className,
}: Props) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
    threshold: 0.4,
  });
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [title, intersection, categoryId, setActiveCategoryId]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <HeadTitle text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px] items-stretch", listClassName)}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variation[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
