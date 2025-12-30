import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: Props) => {
  return <div className={cn("mx-auto max-w-[1200px]", className)}>{children}</div>;
};

export { Container };
