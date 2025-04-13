import React from "react";
import Pagination from "../components/pagination";

import TourCard, { type Tour as TourType } from "../components/tour-card";
import Image from "next/image";

type TourResponse = {
  data: TourType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function TourPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 9;

  async function fetchTours(page: number): Promise<TourResponse> {
    const url = new URL("/api/tours", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch tours:", res.statusText);
      throw new Error("Failed to fetch tours");
    }

    return res.json();
  }

  const { data: tours, meta } = await fetchTours(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

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
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} bookLink={`/tour/${tour.id}`} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/tour"
          />
        </div>
      </div>
    </div>
  );
}
