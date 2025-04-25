"use client";

import TourCard, { type Tour as TourType } from "../components/tour-card";
import Link from "next/link";
import { useState, useEffect } from "react";

type TourFeed = {
  data: TourType[];
  meta: { total: number; page: number; limit: number };
};
async function fetchTours(): Promise<TourFeed> {
  const url = new URL("/api/tours", process.env.NEXT_PUBLIC_API_URL);
  url.searchParams.append("page", "1");
  url.searchParams.append("limit", "4");
  url.searchParams.append("published", "true");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tour");
  }

  return res.json();
}

export default function TourFeed() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState<TourType[]>([]);

  useEffect(() => {
    async function getTours() {
      try {
        const { data } = await fetchTours();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    }

    getTours();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Manud Jaya Tours</h1>
        <Link
          href="/tour"
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          See all tours
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
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
          </>
        ) : (
          <>
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                bookLink={`/tour/${tour.id}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
