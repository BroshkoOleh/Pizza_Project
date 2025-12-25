"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { HeadTitle, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from "../shared/index";
import { useFilterIngredients } from "@/app/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export function Filters({ className }: Props) {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));

  const [prices, setPrices] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices({ ...prices, [name]: value });
  };

  useEffect(() => {
    console.log({ prices, pizzaTypes, sizes, selectedIngredients });
  }, [prices, pizzaTypes, sizes, selectedIngredients]);

  const items = ingredients.map((item) => ({ text: item.name, value: item.id }));
  return (
    <div className={className}>
      <HeadTitle text="Filter" size="sm" className="mb-5 font-bold" />
      {/* top CheckBoxs */}

      <CheckboxFiltersGroup
        title="type of dough"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: "thin", value: "1" },
          { text: "traditional", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="sizes"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: "20 cm", value: "20" },
          { text: "30 cm", value: "30" },
          { text: "40 cm", value: "40" },
        ]}
      />
      {/* price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3"> Price from and to</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="30000"
            value={String(prices.priceTo)}
            onChange={(e) => updatePrices("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrices({ priceFrom, priceTo })}
        />
      </div>

      <CheckboxFiltersGroup
        title="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
}
