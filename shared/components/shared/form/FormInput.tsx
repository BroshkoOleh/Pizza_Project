import React from "react";
import { Input } from "../../ui";
import { ClearButton } from "../ClearButton";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({ className, name, label, required, ...props }: Props) {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton />
      </div>
      <p className="text-red-500 text-sm mt-2">required field</p>
    </div>
  );
}
