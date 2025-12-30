import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./PizzaImage";
import { HeadTitle } from "./HeadTitle";
import { Button } from "../ui";
import { DialogTitle } from "@/shared/components/ui/dialog";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ingredients: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variation: any[];
  //   ingredients: IProduct["ingredients"];
  //   variation: IProduct["variation"];
  onClickAdd?: VoidFunction;
}

export function ChoosePizzaForm({
  imageUrl,
  name,
  ingredients,
  variation,
  onClickAdd,
  className,
}: Props) {
  const textDetails = "30sm , traditional pizza";
  const totalPrice = "200";

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle className="font-extrabold mb-1">{name}</DialogTitle>
        <p className="text-gray-400"> {textDetails} </p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to Cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
}
