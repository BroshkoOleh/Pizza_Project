"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Category } from "../../types";

interface Props {
  categories: Category[];
  className?: string;
}

export function Categories({ categories, className }: Props) {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  if (categories.length === 0) {
    return null;
  }

  const currentCategory = categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const onCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);

    const selectedCategory = categories.find((category) => category.id === categoryId);
    if (!selectedCategory) {
      return;
    }

    const section = document.getElementById(selectedCategory.name);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${selectedCategory.name}`);
  };

  return (
    <>
      <div className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1 max-md:hidden", className)}>
        {categories.map(({ name, id }, index) => {
          return (
            <a
              className={cn(
                "flex h-11 items-center rounded-2xl px-5 font-bold",
                activeCategoryId === id && "bg-white text-primary shadow-md shadow-gray-200"
              )}
              href={`/#${name}`}
              key={index}
            >
              <button>{name}</button>
            </a>
          );
        })}
      </div>

      <div className={cn("hidden min-w-0 flex-1 max-md:block", className)}>
        <Select value={currentCategory.id} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-[52px] w-full rounded-2xl border-none bg-gray-50 px-4 text-left font-bold shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-gray-100">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id} className="py-2 font-medium">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
