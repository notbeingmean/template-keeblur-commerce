"use client";
import { CategoryData, fetchCategories } from "@/lib/fetch";
import { RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function ProductFilterTag() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<CategoryData>([]);

  const getCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const category = searchParams.getAll("category");

  const filteredCategories = categories.filter((c) =>
    category.includes(c.category_id)
  );

  function handleReset() {
    router.push(`?`);
  }

  function handleRemoveCategory(category_id: string) {
    const newCategory = category.filter((c) => c !== category_id);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    newCategory.forEach((c) => params.append("category", c));
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <div
        onClick={handleReset}
        className="cursor-pointer flex text-sm items-center space-x-1 text-blue-500"
      >
        <RotateCcw size={16} /> <span>ล้างตัวกรอง</span>
      </div>

      {filteredCategories.map((c) => (
        <TooltipProvider key={c.category_id}>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                onClick={() => handleRemoveCategory(c.category_id)}
                className="rounded-full"
                variant="outline"
              >
                {c.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>คลิกเพื่อลบตัวกรอง</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

export default ProductFilterTag;
