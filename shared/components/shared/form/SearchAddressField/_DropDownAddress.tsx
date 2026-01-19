import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/shared/components/ui/command";
import { GeoapifyFeature } from "@/shared/hooks/useGeoapifyApi";
import { Loader2 } from "lucide-react";
import React from "react";

interface Props {
  isLoading: boolean;
  addresses: GeoapifyFeature[];
  className?: string;
  handleAddressSelect: (address: GeoapifyFeature["properties"]) => void;
  value: string;
}

export function DropDownAddress({
  isLoading,
  addresses,
  handleAddressSelect,
  value,
  className,
}: Props) {
  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
      {" "}
      <Command>
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <span className="ml-2 text-sm text-gray-500">Saerch adress...</span>
          </div>
        ) : (
          <>
            <CommandGroup>
              {addresses.map((feature) => (
                <CommandItem
                  key={`${feature.properties.place_id}-${feature.properties.lat}-${feature.properties.lon}`}
                  onSelect={() => handleAddressSelect(feature.properties)}
                  className="cursor-pointer hover:bg-gray-100 py-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{feature.properties.address_line1}</span>
                    {feature.properties.address_line2 && (
                      <span className="text-sm text-gray-500">
                        {feature.properties.address_line2}
                      </span>
                    )}
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      {feature.properties.city && <span>{feature.properties.city}, </span>}
                      {feature.properties.county && <span>{feature.properties.county}, </span>}
                      <span>{feature.properties.country}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {addresses.length === 0 && value.length >= 2 && (
              <CommandEmpty className="py-6 text-center text-gray-500">
                The address was not found
              </CommandEmpty>
            )}
          </>
        )}
      </Command>
    </div>
  );
}
