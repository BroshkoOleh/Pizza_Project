"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export function PizzaImage({ imageUrl, size, className }: Props) {
  const sizeMap = {
    20: 300,
    30: 400,
    40: 500,
  };

  const sizeMobileMap = {
    20: 190,
    30: 250,
    40: 310,
  };


  const borderSizeMap = {
    inner: 370,
    outer: 450,
  };

  const borderSizeMobileMap = {
    inner: 230,
    outer: 290,
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const updateIsMobile = () => setIsMobile(media.matches);

    updateIsMobile();
    media.addEventListener("change", updateIsMobile);
    return () => media.removeEventListener("change", updateIsMobile);
  }, []);

  const currentSizeMap = isMobile ? sizeMobileMap : sizeMap;
  const currentBorderMap = isMobile ? borderSizeMobileMap : borderSizeMap;
  const imageSize = currentSizeMap[size];
  const frameSize = Math.max(imageSize, currentBorderMap.outer);

  return (
    <div
      className={cn("relative flex w-full flex-1 items-center justify-center", className)}
      style={{
        minHeight: frameSize,
        height: frameSize,
      }}
    >
      <Image
        src={imageUrl}
        alt="Product image"
        width={imageSize}
        height={imageSize}
        className={cn("relative left-2 top-2 transition-all z-10 duration-300")}
        priority
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200"
        style={{
          width: currentBorderMap.outer,
          height: currentBorderMap.outer,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100"
        style={{
          width: currentBorderMap.inner,
          height: currentBorderMap.inner,
        }}
      />
    </div>
  );
}
