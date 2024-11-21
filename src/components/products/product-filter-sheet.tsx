"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductFilter } from "./product-filter";
import { FilterIcon } from "lucide-react";

export function ProductFilterSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4">
          <FilterIcon className="mr-2 h-4 w-4" />
          ตัวกรอง
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ตัวกรอง</SheetTitle>
          {/* <SheetDescription>
            Apply filters to refine your product search
          </SheetDescription> */}
        </SheetHeader>
        <ProductFilter />
      </SheetContent>
    </Sheet>
  );
}
