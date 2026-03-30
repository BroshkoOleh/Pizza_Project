import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";

interface Props {
  className?: string;
}

export function SortByCategoryPopup({ className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex h-[52px] items-center gap-1 rounded-2xl bg-gray-50 px-3 sm:px-5 cursor-pointer",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b className="hidden sm:inline">Soring</b>
      <b className="text-primary">Populary</b>
    </div>
  );
}
