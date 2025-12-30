import { cn } from "@/shared/lib/utils";
import { Container, Categories, SortByCategoryPopup } from "./index";
import { Category } from "@/shared/types";

interface Props {
  className?: string;
  categories: Category[];
}

export function TopBar({ categories, className }: Props) {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between">
        <Categories categories={categories.filter((category) => category.products.length > 0)} />
        <SortByCategoryPopup />
      </Container>
    </div>
  );
}
