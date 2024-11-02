import { customizeColors } from "@/data/info";
import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import React from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

type BannerProps = {
  title: string;
  description: string;
  className?: string;
  href: string;
};

function Banner({
  title,
  description,
  className,
  href,
  ...props
}: BannerProps & React.HTMLProps<HTMLDivElement>) {
  const { banner } = customizeColors;
  return (
    <div
      className={cn(
        banner,
        "w-full py-8 flex flex-col items-center justify-center text-white space-x-4 "
      )}
      {...props}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
      <Link
        href={href}
        className={buttonVariants({
          className: "mt-2 bg-green-500 hover:bg-green-300 w-40",
        })}
      >
        สั่งเลย!
      </Link>
    </div>
  );
}

export default Banner;
