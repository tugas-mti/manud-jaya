import React from "react";
import Pagination from "../components/pagination";

import Image from "next/image";
import AccommodationCard, {
  Accommodation,
} from "../components/accommodation-card";

type AccommodationResponse = {
  data: Accommodation[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function AccommodationPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 9;

  async function fetchAccommodations(
    page: number
  ): Promise<AccommodationResponse> {
    const url = new URL("/api/accommodations", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch Accommodation:", res.statusText);
      throw new Error("Failed to fetch Accommodation");
    }

    return res.json();
  }

  const { data: accommodations, meta } = await fetchAccommodations(currentPage);
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
          <h1 className="font-bold text-3xl">Accommodations</h1>
          <p className="text-sm md:text-xl leading-tight">
            Stay in our eco-friendly accommodations and immerse yourself in the
            natural beauty of Manud Jaya Village. <br />
            Enjoy a unique experience that combines comfort with sustainability.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/accommodation"
          />
        </div>
      </div>
    </div>
  );
}
