"use client";

import { Input } from "../ui/input";
import { HeadTitle, RangeSlider, CheckboxFiltersGroup } from "./index";
import { useFilters, useQueryFilters, useIngredients } from "@/shared/hooks";

interface Props {
  className?: string;
}

export function Filters({ className }: Props) {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ text: item.name, value: item.id }));

  const updatePrices = (prices: number[]) => {
    console.log(prices, 999);
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <HeadTitle text="Filter" size="sm" className="mb-5 font-bold" />
      {/* top CheckBoxs */}

      <CheckboxFiltersGroup
        title="type of dough"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "thin", value: "1" },
          { text: "traditional", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="sizes"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
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
            value={filters.prices.priceFrom ?? ""}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={filters.prices.priceTo ?? ""}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
}
