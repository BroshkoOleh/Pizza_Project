import React from "react";
import { HeadTitle } from "./HeadTitle";
import { cn } from "@/shared/lib/utils";

interface Props {
  title?: string;
  endAdornment?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function WhiteBlock({ title, endAdornment, className, contentClassName, children }: Props) {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <HeadTitle text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  );
}
