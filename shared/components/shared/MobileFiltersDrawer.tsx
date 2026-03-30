"use client";

import { ArrowRight } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Filters } from "./Filters";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export function MobileFiltersDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 rounded-xl px-4 md:hidden">
          Filters
          <ArrowRight size={16} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-0 data-[vaul-drawer-direction=left]:w-screen md:data-[vaul-drawer-direction=left]:w-[85%] data-[vaul-drawer-direction=left]:max-w-none md:data-[vaul-drawer-direction=left]:max-w-[340px]">
        <DrawerHeader className="flex-row items-center justify-between border-b border-neutral-100">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <X size={16} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <Filters />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
