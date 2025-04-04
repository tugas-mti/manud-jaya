import { MessageCircle, Star } from "lucide-react";
import { type Tour as TourType } from "../../components/tour-card";
import Image from "next/image";

function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  } else {
    const days = Math.floor(minutes / 1440);
    return `${days} ${days === 1 ? "day" : "days"}`;
  }
}

function formatPrice(price: number, currency = "IDR"): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}
export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  async function fetchTour(id: string): Promise<{ data: TourType }> {
    const url = new URL(`/api/tours/${id}`, process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch tour");
    }
    return res.json();
  }

  const { data: tour } = await fetchTour(id);

  const averageRating = calculateAverageRating(tour.reviews);

  return (
    <div className="container mx-auto px-4 mb-8">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {tour.title}
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
                {averageRating.toFixed(1)} ({tour.reviews.length} reviews)
              </span>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-2 h-[480px] w-full overflow-hidden rounded-md">
                <Image
                  src={tour.images?.[0].url || "/placeholder.svg"}
                  alt={tour.images?.[0].altText || "Tour Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {tour.images?.slice(1).map((img, index) => (
                  <div
                    key={index}
                    className="relative h-16 overflow-hidden rounded-md"
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={img.altText || "Tour Image"}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Info Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold">Free Cancellation</h3>
                <p className="text-sm text-gray-600">
                  {tour.cancellationPolicy}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold">Group Size</h3>
                <p className="text-sm text-gray-600">
                  {tour.minGuests}-{tour.maxGuests} guests
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold">Duration</h3>
                <p className="text-sm text-gray-600">
                  {formatDuration(tour.duration)}
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="mb-2 font-semibold">Live Tour Guide</h3>
                <p className="text-sm text-gray-600">{tour.language}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Description</h2>
              <p className="mb-4 text-sm text-gray-700">{tour.description}</p>
            </div>

            {/* Activity */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Activity</h2>
              <h3 className="mb-2 font-semibold">What You Will Do</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                {tour.activities.map((activity) => (
                  <li key={activity.id}>
                    <span className="font-medium">{activity.title}</span>:{" "}
                    {activity.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* What Is Included */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">
                What Is Included / Not Included
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Including</h3>
                  <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                    {tour.inclusions.map((inclusion) => (
                      <li key={inclusion.id}>{inclusion.description}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Not Includes</h3>
                  <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                    {tour.exclusions.map((exclusion) => (
                      <li key={exclusion.id}>{exclusion.description}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Safety</h2>
              <h3 className="mb-2 font-semibold">Health Precautions</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                {tour.safetyInfo.map((info) => (
                  <li key={info.id}>{info.description}</li>
                ))}
                <li>
                  All guides are certified in first aid and mountain rescue
                </li>
                <li>Emergency communication equipment is provided</li>
              </ul>
            </div>

            {/* Details */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Details</h2>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Language</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">
                      {tour.language}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">Duration</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">
                      {formatDuration(tour.duration)}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">
                    Number Of People
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">
                      {tour.minGuests}-{tour.maxGuests} People
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Point */}
            <div className="mb-8">
              <h2 className="mb-2 text-xl font-bold">Meeting Point Address</h2>
              <p className="mb-4 text-sm text-gray-700">
                Meet your guide at the Mount Raung base camp entrance. The
                meeting point is accessible by car from Banyuwangi. Our staff
                with a yellow flag will be waiting to help you.
              </p>
              <h3 className="mb-2 text-sm font-semibold">
                How to Access Below
              </h3>
              <div className="h-64 w-full overflow-hidden rounded-md bg-gray-200">
                <iframe
                  style={{ border: 0, width: "100%", height: 400 }}
                  title="Village, Jl. Jatiluwih Kawan No.Desa, Jatiluwih, Kec. Penebel, Kabupaten Tabanan, Bali 82152"
                  aria-label="Village, Jl. Jatiluwih Kawan No.Desa, Jatiluwih, Kec. Penebel, Kabupaten Tabanan, Bali 82152"
                  allow="autoplay; encrypted-media; gyroscope;"
                  src="https://maps.google.com/maps?q=Village%2C%20Jl.%20Jatiluwih%20Kawan%20No.Desa%2C%20Jatiluwih%2C%20Kec.%20Penebel%2C%20Kabupaten%20Tabanan%2C%20Bali%2082152&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold">Customer Review</h2>
              <div className="mb-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {averageRating.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {tour.reviews.length} Reviews
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {tour.reviews.map((review, index) => (
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
                            <span>{review.user.name}</span>
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

          <div>
            <div className="lg:sticky lg:top-24 rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold">Booking</h2>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="01/01/2025"
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Time Slot
                </label>
                <div className="relative">
                  <select className="w-full rounded-md border border-gray-300 p-2 pr-10 text-sm">
                    <option value="MORNING">Morning</option>
                    <option value="AFTERNOON">Afternoon</option>
                    <option value="EVENING">Evening</option>
                  </select>
                </div>
              </div>

              {/* Guests Selection */}
              <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  No. of Guest
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-300 p-2 text-sm">
                    {Array.from(
                      { length: tour.maxGuests - tour.minGuests + 1 },
                      (_, i) => tour.minGuests + i
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "adult" : "adults"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(tour.price, tour.currency)}
                  <span className="text-sm text-gray-500">/person</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Confirm Booking
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <MessageCircle className="h-4 w-4" />
                  Share This Activity
                </button>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                You must be logged in to book this tour. If you don't have an
                account, please{" "}
                <a href="/register" className="text-green-600 hover:underline">
                  register
                </a>{" "}
                or{" "}
                <a href="/login" className="text-green-600 hover:underline">
                  login
                </a>{" "}
                to your account.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
