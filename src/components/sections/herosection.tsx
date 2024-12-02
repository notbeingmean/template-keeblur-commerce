"use client";
import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const arr = [1, 2, 3, 4, 5];

function HeroSection() {
  return (
    <div className="grid md:grid-cols-3 gap-2">
      {/* Large Image */}
      <div className="col-span-2 ">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {arr.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src="/placeholder/1200x800.svg"
                  width={1200}
                  height={400}
                  alt="banner"
                  className="object-cover w-full h-full max-h-[24.5rem] rounded "
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </div>

      {/* Small Images Container */}
      <div className="md:flex md:flex-col md:space-x-0 md:gap-2 space-x-2 grid grid-cols-2 mb-2 w-full ">
        <Image
          src="/placeholder/400x400.svg"
          width={400}
          height={200}
          alt=""
          className="object-cover w-[600px] h-full rounded max-h-48 "
        />
        <Image
          src="/placeholder/400x400.svg"
          width={400}
          height={200}
          alt=""
          className="object-cover w-full h-full rounded max-h-48"
        />
      </div>
    </div>
  );
}

export default HeroSection;
