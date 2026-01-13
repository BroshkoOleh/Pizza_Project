import React from "react";
import { Input } from "../../ui";
import { FormInput } from "../form";
import { WhiteBlock } from "../WhiteBlock";

interface Props {
  className?: string;
}

export function CheckoutPersonalData({ className }: Props) {
  return (
    <WhiteBlock title="2. Personal data">
      <div className="grid grid-cols-2 gap-5">
        <Input name="firstName" className="text-base" placeholder="Name" />
        <Input name="lastName" className="text-base" placeholder="Last name" />
        <Input name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
}
