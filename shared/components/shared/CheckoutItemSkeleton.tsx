import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center justify-between max-[500px]:flex-col max-[500px]:items-stretch", className)}>
      <div className="flex items-center gap-5">
        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse" />
        <h2 className="w-40 h-6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-4 max-[500px]:justify-center">
        <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-[133px] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
};
