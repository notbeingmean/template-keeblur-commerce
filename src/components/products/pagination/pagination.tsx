"use client";
import {
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductType } from "@/lib/fetch";
import { useSearchParams, notFound } from "next/navigation";
import React from "react";

type PaginationsProps = {
  products: ProductType;
};

function Paginations({ products }: PaginationsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const itemsPerPage = 1;
  const currentPage = parseInt(page as string) || 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (currentPage > totalPages) {
    return notFound();
  }

  const GeneratePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: page.toString() }).toString()}`}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      items.push(
        <PaginationItem key="end-ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    return items;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: Math.max(1, currentPage - 1).toString() }).toString()}`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        <GeneratePaginationItems />
        <PaginationItem>
          <PaginationNext
            href={`?${new URLSearchParams({ ...Object.fromEntries(searchParams.entries()), page: Math.min(totalPages, currentPage + 1).toString() }).toString()}`}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginations;
