"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Grid2x2 } from "lucide-react";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "อิเล็กทรอนิกส์",
    subcategories: ["สมาร์ทโฟน", "แล็ปท็อป", "แท็บเล็ต", "สมาร์ทวอทช์"],
  },
  {
    id: 2,
    name: "เสื้อผ้า",
    subcategories: ["เสื้อยืด", "กางเกงยีนส์", "ชุดเดรส", "แจ็คเก็ต"],
  },
  {
    id: 3,
    name: "บ้านและสวน",
    subcategories: ["โซฟา", "โต๊ะอาหาร", "เตียง", "เครื่องมือทำสวน"],
  },
  {
    id: 4,
    name: "กีฬา",
    subcategories: ["รองเท้าวิ่ง", "เสื่อโยคะ", "ดัมเบล", "ไม้เทนนิส"],
  },
];

function NavMenu() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center space-x-1">
            <Grid2x2 size={16} />
            <span>สินค้าทั้งหมด</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-96">
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className="relative">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 flex items-center justify-between"
                    >
                      {category.name}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <Transition
                      show={activeCategory === category.id}
                      enter="transition-all duration-300 ease-out"
                      enterFrom="opacity-0 translate-x-5"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition-all duration-300 ease-in"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 translate-x-5"
                    >
                      <div className="py-2">
                        <ul>
                          {category.subcategories.map((subcategory, index) => (
                            <li key={index}>
                              <Link
                                href="#"
                                className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                {subcategory}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Transition>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
