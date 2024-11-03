import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { customizeColors } from "@/data/info";
import Link from "next/link";

const arr = [1, 2, 3, 4, 5];

function BlogSection() {
  const { bg } = customizeColors;
  return (
    <div className=" my-4">
      <div className={cn("py-8  rounded", bg)}>
        <div className="container text-white">
          <h1 className="text-2xl font-bold">บทความแนะนำ</h1>
          <p className="text-sm">บทความดีๆที่เราอยากแนะนำให้คุณ</p>
        </div>
      </div>
      <div className="space-y-2 my-2">
        <div className="grid md:grid-cols-2 grid-cols-1 h-full gap-2">
          {arr.slice(0, 2).map((item) => (
            <div className="relative" key={item}>
              <Image
                src="/placeholder/800x800.svg"
                width={800}
                height={800}
                alt=""
                className="object-cover w-full h-full max-h-96 rounded "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
                <div className="text-white  md:mt-40 mt-20 text-center">
                  <p className="text-sm">อุปกรณ์จัดโต๊ะคอม</p>
                  <p className="text-xs">ให้โต๊ะทำงานมีประสิทธิภาพมากขึ้น</p>
                  <Button className="mt-2 rounded-none p-4 bg-white text-black hover:bg-zinc-300">
                    ดูสินค้า <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:grid grid-cols-3 h-full gap-2 hidden">
          {arr.slice(2, 5).map((item) => (
            <div className="relative" key={item}>
              <Image
                src="/placeholder/800x800.svg"
                width={800}
                height={800}
                alt=""
                className="object-cover w-full h-full max-h-96 rounded "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
                <div className="text-white  mt-40 text-center">
                  <p className="text-sm">อุปกรณ์จัดโต๊ะคอม</p>
                  <p>ให้โต๊ะทำงานมีประสิทธิภาพมากขึ้น</p>
                  <Button className="mt-2 rounded-none p-4 bg-white text-black hover:bg-zinc-300">
                    ดูสินค้า <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/products"
          className="col-span-2 md:col-span-5 flex items-center justify-center p-1 rounded bg-white text-black underline underline-offset-2"
        >
          ดูเพิ่มเติม
        </Link>
      </div>
    </div>
  );
}

export default BlogSection;
