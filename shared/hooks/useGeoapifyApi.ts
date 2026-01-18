import { useEffect, useRef, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import axios from "axios";

export interface GeoapifyFeature {
  properties: {
    formatted: string;
    address_line1: string;
    address_line2?: string;
    city?: string;
    country: string;
    country_code: string;
    state?: string;
    county?: string;
    lat: number;
    lon: number;
    place_id: string;
  };
}

export interface GeoapifyResponse {
  features: GeoapifyFeature[];
}

export const useGeoapifyApi = (
  setValue: UseFormSetValue<FieldValues>,
  name: string,
  value: string
) => {
  const api = "https://api.geoapify.com/v1/geocode/autocomplete";
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!;

  const params = {
    text: value,
    apiKey: apiKey,
    limit: 10,
    // lang: "uk",
    // filter: "countrycode:ua",
  };
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addresses, setAddresses] = useState<GeoapifyFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const isSelectingRef = useRef(false);

  // Debounce to prevent too frequent requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  // Calls API Geoapify
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }
    if (debouncedSearch.length < 2) {
      setAddresses([]);
      setShowSuggestions(false);
      return;
    }

    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<GeoapifyResponse>(api, {
          params,
        });
        console.log(data);
        setAddresses(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Address search error:", error);
        setAddresses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [debouncedSearch, apiKey]);

  const onClickClear = () => {
    setValue(name, "");
    setAddresses([]);
    setShowSuggestions(false);
  };

  const handleAddressSelect = (address: GeoapifyFeature["properties"]) => {
    isSelectingRef.current = true;
    setValue(name, address.formatted, { shouldValidate: true });
    setShowSuggestions(false);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  return { showSuggestions, addresses, isLoading, onClickClear, handleAddressSelect, handleBlur };
};
