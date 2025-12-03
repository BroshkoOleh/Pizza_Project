import React from "react";

interface Props {
  className?: string;
}

export function ProductCard({ className }: Props) {
  return <div className={className}>ProductCard</div>;
}
