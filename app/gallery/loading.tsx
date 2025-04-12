import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <div className="relative w-full mx-auto overflow-hidden min-h-[240px]">
        <Image
          src="/images/background1.webp"
          alt="BG"
          layout="fill"
          className="relative"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute text-center text-white container mx-auto my-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-3xl">Gallery</h1>
          <p className="text-sm md:text-xl leading-tight">
            Explore our gallery and discover the beauty of our destination! From
            stunning landscapes to vibrant culture, let these images inspire
            your next adventure.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="aspect-video bg-gray-300/50 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-gray-300/50 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
