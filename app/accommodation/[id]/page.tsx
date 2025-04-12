import { Star } from "lucide-react";
import { type Accommodation } from "../../components/accommodation-card";
import Image from "next/image";
import AccommodationBooking from "@/app/components/accommodation-booking";

function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export default async function AccommodationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  async function fetchAccomodation(
    id: string
  ): Promise<{ data: Accommodation }> {
    const url = new URL(
      `/api/accommodations/${id}`,
      process.env.NEXT_PUBLIC_API_URL
    );
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch accomodations");
    }
    return res.json();
  }

  const { data: accommodation } = await fetchAccomodation(id);

  const averageRating = calculateAverageRating(accommodation.reviews);

  return (
    <div className="container mx-auto px-4 mb-8">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Accomodations Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {accommodation.name}
            </h1>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= averageRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({accommodation.reviews.length}{" "}
                reviews)
              </span>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-2 h-[480px] w-full overflow-hidden rounded-md">
                <Image
                  src={accommodation.images?.[0].url || "/placeholder.svg"}
                  alt={
                    accommodation.images?.[0].altText || "Accomodations Image"
                  }
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {accommodation.images?.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="relative h-16 overflow-hidden rounded-md"
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={img.altText || "Accomodations Image"}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Description</h2>
              <p className="mb-4 text-sm text-gray-700">
                {accommodation.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Customer Review</h2>
              <div className="mb-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {averageRating.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {accommodation.reviews.length} Reviews
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {accommodation.reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                          <div className="size-48 rounded-full bg-gray-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            <span>{review.user?.name}</span>
                            <span> • </span>
                            <span>{review.createdAt.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AccommodationBooking accommodation={accommodation} />
        </div>
      </main>
    </div>
  );
}
