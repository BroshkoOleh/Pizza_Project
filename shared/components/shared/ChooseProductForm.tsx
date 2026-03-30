import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import { DialogTitle } from "@/shared/components/ui/dialog";
import Image from "next/image";
import { HeadTitle } from "./HeadTitle";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  price: number;
  loading?: boolean;
  isModal: boolean;
  onClickAddCart?: () => void;
}

export function ChooseProductForm({
  imageUrl,
  name,
  onClickAddCart,
  price,
  loading,
  isModal,
  className,
}: Props) {
  return (
    <div className={cn(className, "flex min-h-0 flex-col lg:flex-1 lg:flex-row")}>
      <div
        className={cn(
          "relative order-2 flex w-full shrink-0 items-center justify-center py-2 lg:order-1 lg:flex-1 lg:py-0",
          className
        )}
      >
        <Image
          src={imageUrl}
          alt="Product image"
          width={350}
          height={350}
          className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
          priority
        />
      </div>
      <div className="order-1 w-full bg-[#f7f6f5] p-4 lg:order-2 lg:w-[490px] lg:p-7">
        {isModal ? (
          <DialogTitle className="font-extrabold mb-1">{name}</DialogTitle>
        ) : (
          <HeadTitle className="font-extrabold mb-1" text={name} />
        )}
        {/* <p className="text-gray-400"> {textDetails} </p> */}

        <Button
          loading={loading}
          onClick={onClickAddCart}
          className="hidden h-[55px] px-10 text-base rounded-[18px] w-full mt-10 lg:flex"
        >
          Add to Cart for {price} $
        </Button>
      </div>
      <div className="order-3 p-4 pt-2 lg:hidden">
        <Button loading={loading} onClick={onClickAddCart} className="h-[55px] w-full rounded-[18px] px-10 text-base">
          Add to Cart for {price} $
        </Button>
      </div>
    </div>
  );
}
