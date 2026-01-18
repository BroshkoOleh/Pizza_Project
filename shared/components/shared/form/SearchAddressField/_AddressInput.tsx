"use client";
import React from "react";
import { Input } from "../../../ui";
import { ClearButton } from "../../ClearButton";
import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  isLoading: boolean;
  className?: string;
  errorText: string;
  value: string;
  handleBlur: VoidFunction;
  onClickClear: VoidFunction;
}

export function AddressInput({
  name,
  label,
  required,
  placeholder,
  register,
  value,
  isLoading,
  errorText,
  handleBlur,
  onClickClear,
  className,
}: Props) {
  return (
    <div className="relative">
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <Input
        placeholder={placeholder}
        {...register(name)}
        onBlur={handleBlur}
        className="h-12 text-md"
      />
      {value && <ClearButton onClick={onClickClear} />}
      {isLoading && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
        </div>
      )}
      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
}
