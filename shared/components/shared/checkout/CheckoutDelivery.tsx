import { WhiteBlock } from "../WhiteBlock";
import { FormTextarea, SearchAddressInput } from "../form";

interface Props {
  className?: string;
}

export function CheckoutDelivery({ className }: Props) {
  return (
    <WhiteBlock className={className} title="3 Delivery address">
      <div className="flex flex-col gap-3">
        <SearchAddressInput name="address" placeholder="Enter delivery address" />
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
