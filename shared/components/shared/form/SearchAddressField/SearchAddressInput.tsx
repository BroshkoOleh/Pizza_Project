"use client";

import { useFormContext } from "react-hook-form";
import { DropDownAddress } from "./_DropDownAddress";
import { AddressInput } from "./_AddressInput";
import { useGeoapifyApi } from "@/shared/hooks/useGeoapifyApi";

interface AddressAutocompleteProps {
  name: string;
  // label?: string;
  // required?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchAddressInput({ placeholder, className, name }: AddressAutocompleteProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const { showSuggestions, addresses, isLoading, onClickClear, handleAddressSelect, handleBlur } =
    useGeoapifyApi(setValue, name, value);

  return (
    <div className={`relative ${className}`}>
      <AddressInput
        name={name}
        register={register}
        isLoading={isLoading}
        errorText={errorText}
        value={value}
        handleBlur={handleBlur}
        onClickClear={onClickClear}
        placeholder={placeholder}
      />

      {showSuggestions && (addresses.length > 0 || isLoading) && (
        <DropDownAddress
          isLoading={isLoading}
          addresses={addresses}
          handleAddressSelect={handleAddressSelect}
          value={value}
        />
      )}
    </div>
  );
}
