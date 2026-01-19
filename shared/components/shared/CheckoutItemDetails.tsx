import React, { ReactNode } from "react";
interface Props {
  title: ReactNode | string;
  value: ReactNode | number;
  className?: string;
}

export function CheckoutItemDetails({ title, value, className }: Props) {
  return (
    <div className="flex items-center justify-between my-4">
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}
