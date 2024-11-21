"use client";

import { useCallback, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CategoryData, fetchCategories } from "@/lib/fetch";
import { formatPrice } from "@/lib/utils";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  async function onSearch() {
    const searchParams = new URLSearchParams();
    selectedCategories.forEach((category) =>
      searchParams.append("category", category)
    );
    searchParams.set("minPrice", priceRange[0].toString());
    searchParams.set("maxPrice", priceRange[1].toString());
    router.push(`?${searchParams.toString()}`);
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    router.push(`?`);
  };

  const getCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="py-4">
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">ประเภทสินค้า</h3>
        {categories.map((category) => (
          <div key={category.category_id} className="flex items-center mb-2">
            <Checkbox
              id={category.category_id}
              checked={selectedCategories.includes(category.category_id)}
              onCheckedChange={() => handleCategoryChange(category.category_id)}
            />
            <Label htmlFor={category.category_id} className="ml-2 text-sm">
              {category.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">ช่วงราคา</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
        <div className="flex space-x-2 my-2">
          <Input
            placeholder="ต่ำสุด"
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
          />
          <Input
            placeholder="สูงสุด"
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
          />
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        ล้างทั้งหมด
      </Button>
      <Button className="w-full mt-2" onClick={onSearch}>
        ค้นหา
      </Button>
    </div>
  );
}
