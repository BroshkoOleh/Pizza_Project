"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { HeadTitle, FilterCheckbox, RangeSlider, CheckboxFiltersGroup } from "../shared/index";
import { useFilterIngredients } from "@/app/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export function Filters({ className }: Props) {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const [prices, setPrices] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices({ ...prices, [name]: value });
  };

  const items = ingredients.map((item) => ({ text: item.name, value: item.id }));
  return (
    <div className={className}>
      <HeadTitle text="Filter" size="sm" className="mb-5 font-bold" />
      {/* top CheckBoxs */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="can_be_collected" text="can be collected" value="1" />
        <FilterCheckbox name="novelty" text="novelty" value="2" />
      </div>
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
        selectedIds={selectedIds}
        name="ingredients"
      />
    </div>
  );
}
