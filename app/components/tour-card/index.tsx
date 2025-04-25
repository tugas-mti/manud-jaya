"use client";

import { Clock, MapPin, Users, Star, Check, X } from "lucide-react";
import { Prisma } from "@prisma/client";
import { formatDuration, calculateAverageRating } from "./utils";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export type Tour = Prisma.TourGetPayload<{
  include: {
    location: true;
    category: true;
    images: true;
    activities: true;
    inclusions: true;
    exclusions: true;
    safetyInfo: true;
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

interface TourCardProps {
  tour: Tour;
  bookLink?: string;
}

export default function TourCard({ tour, bookLink }: TourCardProps) {
  const averageRating = calculateAverageRating(tour.reviews);

  return (
    <div className="max-w-md rounded-lg bg-white p-0 shadow-lg">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          width={600}
          height={400}
          src={
            tour.images.length > 0
              ? tour.images[0].url
              : "/placeholder.svg?height=400&width=600"
          }
          alt={
            tour.images.length > 0 ? tour.images[0].altText || "" : tour.title
          }
          className="h-full w-full object-cover rounded-t-lg"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800">
          {tour.category?.name || "Category"}
        </div>
      </div>

      {/* Content container */}
      <div className="p-5">
        {/* Title and Rating */}
        <div className="mb-2 flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-800">{tour.title}</h2>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{averageRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p
          className="mb-4 text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: tour.description }}
        />

        {/* Location */}
        <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{tour.location.name}, Indonesia</span>
        </div>

        {/* Info items */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Duration: {formatDuration(tour.duration)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>
              {tour.minGuests}-{tour.maxGuests} guests
            </span>
          </div>
        </div>

        {/* Activities */}
        {tour.activities.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-800">Activities:</h3>
            <div className="flex flex-wrap gap-2">
              {tour.activities.map((activity) => (
                <span
                  key={activity.id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                >
                  {activity.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Inclusions */}
        {tour.inclusions.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-800">Inclusions:</h3>
            <ul className="space-y-1">
              {tour.inclusions.map((inclusion) => (
                <li
                  key={inclusion.id}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <Check className="h-4 w-4 text-green-500" />
                  {inclusion.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exclusions */}
        {tour.exclusions.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-800">Exclusions:</h3>
            <ul className="space-y-1">
              {tour.exclusions.map((exclusion) => (
                <li
                  key={exclusion.id}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <X className="h-4 w-4 text-red-500" />
                  {exclusion.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="block text-xl font-bold text-green-600">
              {formatPrice(tour.price, tour.currency)}
            </span>
            <span className="text-xs text-gray-500">per person</span>
          </div>

          {/* <button
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            onClick={onBookNow}
          >
            Book Now
          </button> */}
          <Link
            href={bookLink || `/tour/${tour.id}`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
