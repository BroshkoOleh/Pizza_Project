import { cn } from "@/lib/utils";
import { Container, Categories, SortByCategoryPopup } from "./index";

interface Props {
  className?: string;
}

export function TopBar({ className }: Props) {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between">
        <Categories />
        <SortByCategoryPopup />
      </Container>
    </div>
  );
}
