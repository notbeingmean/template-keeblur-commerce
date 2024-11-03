"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import IconInput from "@/components/ui/icon-input";
import useDebounce from "@/hooks/useDebounce";
import {
  cn,
  fetchProducts,
  fetchSearchResults,
  ProductType,
  SearchResults,
} from "@/lib/utils";

import { ChevronRight, Grid2X2, Search, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResults>();
  const [products, setProducts] = useState<ProductType>([]);

  const getProducts = useCallback(async () => {
    try {
      const productsData = await fetchProducts({ take: 3 });
      setProducts(productsData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setProducts([]);
    }
  }, []);

  const [value, loading] = useDebounce(searchValue, 1500);

  useEffect(() => {
    async function fetchSearch(searchValue: string) {
      const results = await fetchSearchResults(searchValue);
      setSearchResult(results);
    }
    if (value) {
      fetchSearch(value);
    }
  }, [value]);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleFocus = () => setIsOpen(true);
  const handleBlur = () => {
    // Delay hiding the dropdown to allow for clicking on suggestions
    setTimeout(() => setIsOpen(false), 200);
  };

  const searchCategories = searchResult?.filter(
    (result) => result.type === "category"
  );
  const searchProducts = searchResult?.filter(
    (result) => result.type === "product"
  );

  return (
    <div className="w-full max-w-xl mx-4 relative">
      <IconInput
        icon={<Search className="h-4 w-4 " />}
        placeholder="ค้นหาสินค้า"
        className="w-full rounded-xl "
        containerClassName=""
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSearch}
      />
      {isOpen && searchValue === "" ? (
        <Card className="absolute my-2 w-full">
          <CardHeader>
            <CardTitle>สินค้าแนะนำ</CardTitle>
            <CardDescription>
              สินค้าที่คุณอาจสนใจ ที่เราเลือกมาให้เป็นพิเศษ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {products.map((product) => {
                return (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.product_id}
                    className="flex items-center justify-between p-2 hover:bg-zinc-200"
                  >
                    <div className="flex items-center space-x-2 ">
                      {product.images?.length > 0 && (
                        <Image
                          src={product.images[0].imageUrl}
                          width={50}
                          height={50}
                          alt={product.images[0].altText || product.name}
                        />
                      )}
                      <p>{product.name}</p>
                    </div>
                    <ChevronRight className="text-zinc-300" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {isOpen && searchValue ? (
        <Card className="absolute my-2 w-full">
          <CardHeader>
            <CardTitle>กำลังหาของพวกนี้อยู่ใช้ไหม</CardTitle>
            <CardDescription>
              ผลการค้นหาสำหรับ &quot;{searchValue}&quot;
            </CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="text-center">กำลังค้นหา...</div>
            ) : (
              <div className="space-y-2">
                <div>
                  <div
                    className={cn(
                      searchCategories && searchCategories.length > 0
                        ? "block"
                        : "hidden",
                      "font-bold text-lg "
                    )}
                  >
                    หมวดหมู่
                  </div>

                  {searchCategories?.map((result, index) => (
                    <Link
                      href={`/categories/${result.slug}`}
                      key={index}
                      className="flex items-center space-x-2 p-1 hover:bg-zinc-100"
                    >
                      <div className="p-1 bg-zinc-300">
                        <Grid2X2 size={16} />
                      </div>
                      <span>{result.name}</span>
                    </Link>
                  ))}
                </div>
                <div>
                  <div
                    className={cn(
                      searchProducts && searchProducts.length > 0
                        ? "block"
                        : "hidden",
                      "font-bold text-lg "
                    )}
                  >
                    สินค้า
                  </div>
                  {searchProducts?.map((result, index) => (
                    <Link
                      href={"/" + result.slug}
                      key={index}
                      className="flex items-center space-x-2 p-1 hover:bg-zinc-100"
                    >
                      <div className="p-1 bg-zinc-300">
                        <ShoppingBasket size={16} />
                      </div>
                      <span>{result.name}</span>
                    </Link>
                  ))}
                </div>
                {searchCategories?.length === 0 &&
                  searchProducts?.length === 0 && (
                    <div className="text-center">ไม่พบผลคำค้นหาของคุณ</div>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default SearchInput;
