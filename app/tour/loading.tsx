import React from "react";

import Image from "next/image";

export default async function TourPage() {
  return (
    <div>
      <div className="relative w-full mx-auto overflow-hidden min-h-[240px] mb-8">
        <Image
          src="/images/background1.webp"
          alt="BG"
          layout="fill"
          className="relative"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute text-center text-white container mx-auto my-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-3xl">Tour</h1>
          <p className="text-sm md:text-xl leading-tight">
            Experience the beauty of Manud Jaya Village through our curated
            tours and activities. From breathtaking landscapes to rich cultural
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((_, index) => (
            // pulse loading
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center"
            >
              <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg mb-4"></div>
              <div className="w-full">
                <div className="animate-pulse bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-full rounded mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-full rounded mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
