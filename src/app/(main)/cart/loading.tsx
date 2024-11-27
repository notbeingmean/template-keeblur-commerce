import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className=" px-4 py-8 h-full mb-24">
      <Skeleton className="h-4 w-[250px]" />
      <div className="flex items-center justify-center flex-col">
        <Skeleton className="p-4 w-full max-w-sm" />
        <div className="grid grid-cols-2 gap-2 w-full justify-items-center my-6 h-60">
          <Skeleton className="p-4 w-full h-60" />
          <Skeleton className="p-4 w-full  h-60" />
        </div>
      </div>
    </div>
  );
}

export default loading;
