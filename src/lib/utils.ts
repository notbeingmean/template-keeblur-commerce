import { client } from "@/server/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(price);
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCategories(
  opts: {
    skip?: number;
    take?: number;
    productSkip?: number;
    productTake?: number;
  } = {}
) {
  const { data, error } = await client.api.categories.get({
    query: opts,
  });

  if (error) {
    return [];
  }

  return data;
}

export async function fetchProducts(opts: { skip?: number; take?: number }) {
  const { data, error } = await client.api.products.get({
    query: opts,
  });

  if (error) {
    return [];
  }

  return data;
}

export async function fetchSearchResults(searchValue: string) {
  const { data, error } = await client.api.autocomplete.get({
    query: {
      keyword: searchValue,
    },
  });

  if (error) {
    return [];
  }

  return data;
}

export type CategoryData = Awaited<ReturnType<typeof fetchCategories>>;
export type ProductType = Awaited<ReturnType<typeof fetchProducts>>;
export type SearchResults = Awaited<ReturnType<typeof fetchSearchResults>>;
