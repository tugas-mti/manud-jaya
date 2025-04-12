import { use } from "react";
import TourCard, { type Tour as TourType } from "../components/tour-card";
import Link from "next/link";

type TourFeed = {
  data: TourType[];
  meta: { total: number; page: number; limit: number };
};
async function fetchTours(): Promise<TourFeed> {
  const url = new URL("/api/tours", process.env.NEXT_PUBLIC_API_URL);
  url.searchParams.append("page", "1");
  url.searchParams.append("limit", "3");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tour");
  }

  return res.json();
}

export default function TourFeed() {
  const { data: tours, meta } = use(fetchTours());

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} bookLink={`/tour/${tour.id}`} />
        ))}
      </div>
    </div>
  );
}
