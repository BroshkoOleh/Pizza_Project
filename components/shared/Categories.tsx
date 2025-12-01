import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
const categories = [
  "Pizzas",
  "Combos",
  "Snacks",
  "Cocktails",
  "Coffee",
  "Drinks",
  "Desserts",
  "Desserts",
];
const activeIndex = 0;

export function Categories({ className }: Props) {
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {categories.map((category, index) => {
        return (
          <a
            className={cn(
              "flex items-center font-bold h-11 rounded-2xl px-5",
              activeIndex === index && "bg-white shadow-md shadow-gray-200 text-primary"
            )}
            key={index}
          >
            <button>{category}</button>
          </a>
        );
      })}
    </div>
  );
}
