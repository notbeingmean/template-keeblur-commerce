"use client";
import { useCallback, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Grid2x2, ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { client } from "@/server/client";

async function fetchCategories() {
  const { data, error } = await client.api.categories.get({
    query: {
      take: 5,
    },
  });

  if (error) {
    return [];
  }

  return data;
}

type CategoryData = Awaited<ReturnType<typeof fetchCategories>>;
type CategoryListProps = {
  categories: CategoryData;
  // eslint-disable-next-line no-unused-vars
  onCategoryClick: (categoryId: string) => void;
  activeCategory: string | null;
};

function NavMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryData>([]);

  const getCategories = useCallback(async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryClick = (categoryId: string) => {
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
            <CategoryList
              categories={categories}
              onCategoryClick={handleCategoryClick}
              activeCategory={activeCategory}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function CategoryList({
  categories,
  onCategoryClick,
  activeCategory,
}: CategoryListProps) {
  return (
    <div className="p-4 w-96">
      <ul>
        {categories.map((category) => (
          <li key={category.category_id} className="relative">
            <button
              onClick={() => onCategoryClick(category.category_id)}
              className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 flex items-center justify-between"
            >
              {category.name}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <Transition
              show={activeCategory === category.category_id}
              enter="transition-all duration-300 ease-out"
              enterFrom="opacity-0 translate-x-5"
              enterTo="opacity-100 translate-x-0"
              leave="transition-all duration-300 ease-in"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-5"
            >
              <div className="py-2">
                <ul>
                  {category.products.map((product) => (
                    <li key={product.product_id}>
                      <Link
                        href={`/${category.slug}/${product.slug}`}
                        className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/${category.slug}`}
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      ดูทั้งหมด
                    </Link>
                  </li>
                </ul>
              </div>
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavMenu;
