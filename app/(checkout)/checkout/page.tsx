"use client";
import {
  CheckoutItem,
  CheckoutSidebar,
  Container,
  HeadTitle,
  WhiteBlock,
} from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib/helpers";

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, deleteCartItem } = useCart();

  const handleQuantityCartItem = (id: string, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-5">
      <HeadTitle text={"Placing an order"} className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-20">
        {/* LEFT SIDE  */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                    item.ingredients
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  changeQuantityCartItem={(type) =>
                    handleQuantityCartItem(item.id, item.quantity, type)
                  }
                  removeCartItem={() => deleteCartItem(item.id)}
                />
              ))}
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
        <CheckoutSidebar totalAmount={totalAmount} />
      </div>
    </Container>
  );
}
