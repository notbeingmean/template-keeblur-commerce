import { cn } from "@/lib/utils";
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
  const customizeColors = {
    bg: "bg-gradient-to-r from-purple-500 to-purple-900",
    logo: "bg-gradient-to-r from-purple-500 to-purple-900",
    btn: "bg-gradient-to-r from-purple-500 to-purple-900",
    btnText: "bg-gradient-to-r from-purple-500 to-purple-900",
    btnHover: "bg-gradient-to-r from-purple-500 to-purple-900",
    banner: "bg-gradient-to-r from-rose-400 to-red-500",
  };

  const { banner } = customizeColors;
  return (
    <div
      className={cn(
        banner,
        "w-full py-8 flex flex-col items-center justify-center text-white space-x-4 ",
        className
      )}
      {...props}
    >
      <h3 className="md:text-2xl text-xl font-bold">{title}</h3>
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
