"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  }
  return (
    <div>
      <Select
        defaultValue={searchParams.get("sort") || "recommend"}
        onValueChange={(e) => handleSort(e)}
      >
        <SelectTrigger className="w-full max-w-lg">
          <SelectValue placeholder="สินค้าแนะนำ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommend">สินค้าแนะนำ</SelectItem>
          <SelectItem value="name-asc">เรียงจาก A - Z</SelectItem>
          <SelectItem value="name-desc">เรียงจาก Z - A</SelectItem>
          <SelectItem value="low-to-high">ราคา: ต่ำ - สูง</SelectItem>
          <SelectItem value="high-to-low">ราคา: สูง - ต่ำ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ProductSort;
