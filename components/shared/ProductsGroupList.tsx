"use client";

import React from "react";

import { HeadTitle } from "./index";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  items: { price: number }[];
}

interface Props {
  title: string;
  products: Product[];
  categoryId: number;
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
  const intersectionRef = React.useRef(null);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <HeadTitle text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            // ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
