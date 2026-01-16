import React from "react";
import { WhiteBlock } from "../WhiteBlock";
import { Input } from "../../ui";
import { FormTextarea } from "../form";

interface Props {
  className?: string;
}

export function CheckoutDelivery({ className }: Props) {
  return (
    <WhiteBlock title="3 Delivery address">
      <div className="flex flex-col gap-5">
        <Input name="adress" className="text-base" placeholder="Delivery adress" />
        <FormTextarea
          className="text-base"
          rows={5}
          placeholder="Comments on the order"
          name={"comment"}
        />
      </div>
    </WhiteBlock>
  );
}
