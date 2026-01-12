import {
  CheckoutItem,
  CheckoutItemDetails,
  Container,
  HeadTitle,
  WhiteBlock,
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  const totalPrice = 200;
  return (
    <Container className="mt-5">
      <HeadTitle text={"Placing an order"} className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-20">
        {/* LEFT SIDE  */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <ul className="flex flex-col gap-5">
              <CheckoutItem
                id={"ab6faa57-0790-4908-944a-86e26473d439"}
                imageUrl={"/pizzas/paperoni.webp"}
                details={
                  "traditional 30 sm fbdbdfbfd  fdbbbbbb    fdbbbbbbbbbbbbb bfdddddddddddd bfdddddddddddd"
                }
                name={"Paperoni Fresh"}
                price={200}
                quantity={1}
              />
              <CheckoutItem
                id={"ab6faa57-0790-4908-944a-86e26473d439"}
                imageUrl={"/pizzas/paperoni.webp"}
                details={
                  "traditional 30 sm fbdbdfbfd  fdbbbbbb    fdbbbbbbbbbbbbb bfdddddddddddd bfdddddddddddd"
                }
                name={"Paperoni Fresh"}
                price={200}
                quantity={1}
              />
              <CheckoutItem
                id={"ab6faa57-0790-4908-944a-86e26473d439"}
                imageUrl={"/pizzas/paperoni.webp"}
                details={
                  "traditional 30 sm fbdbdfbfd  fdbbbbbb    fdbbbbbbbbbbbbb bfdddddddddddd bfdddddddddddd"
                }
                name={"Paperoni Fresh"}
                price={200}
                quantity={1}
              />
            </ul>
          </WhiteBlock>
          <WhiteBlock title="2. Personal data">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Name" />
              <Input name="lastName" className="text-base" placeholder="Last name" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3 Delivery address. Personal data">
            <div className="flex flex-col gap-5">
              <Input name="adress" className="text-base" placeholder="Delivery adress" />
              <Textarea className="text-base" rows={5} placeholder="Comments on the order" />
            </div>
          </WhiteBlock>
        </div>
        {/* RIGHT SIDE  */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total:</span>
              <span className="text-[32px] font-extrabold">{totalPrice}$</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Cost of goods:
                </div>
              }
              value={"350"}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Tax:
                </div>
              }
              value={"350"}
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Delivery
                </div>
              }
              value={"350"}
            />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
              Proceed to payment
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
