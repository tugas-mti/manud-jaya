"use client";

import { Clock, MapPin, Users, Star, Check, X } from "lucide-react";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export type Accommodation = Prisma.AccommodationGetPayload<{
  include: {
    location: true;
    images: true;
    reviews: {
      include: {
        user: {
          select: {
            name: true;
            email: true;
          };
        };
      };
    };
  };
}>;

interface AccommodationCardProps {
  accommodation: Accommodation;
  bookLink?: string;
}

export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export default function AccommodationCard({
  accommodation,
  bookLink,
}: AccommodationCardProps) {
  const averageRating = calculateAverageRating(accommodation.reviews);

  return (
    <div className="max-w-md rounded-lg bg-white p-0 shadow-lg">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          width={600}
          height={400}
          src={
            accommodation.images.length > 0
              ? accommodation.images[0].url
              : "/placeholder.svg?height=400&width=600"
          }
          alt={
            accommodation.images.length > 0
              ? accommodation.images[0].altText || ""
              : accommodation.name
          }
          className="h-full w-full object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800">
          Eco-Friendly
        </div>
      </div>

      {/* Content container */}
      <div className="p-5">
        {/* Title and Rating */}
        <div className="mb-2 flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            {accommodation.name}
          </h2>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600">
          {accommodation.description}
        </p>

        {/* Location */}
        <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{accommodation.location.name}, Indonesia</span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="block text-xl font-bold text-green-600">
              {formatPrice(accommodation.price, accommodation.currency)}
            </span>
            <span className="text-xs text-gray-500">/person per night</span>
          </div>

          <Link
            href={bookLink || `/accommodation/${accommodation.id}`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
