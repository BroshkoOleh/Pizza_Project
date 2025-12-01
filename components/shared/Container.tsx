import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: Props) => {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
};

export { Container };
