"use client";

import { useSession } from "next-auth/react";
import { type Accommodation } from "@/app/components/accommodation-card";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const bookingSchema = z
  .object({
    checkInDate: z.string().min(1, "Check-in date is required"),
    checkOutDate: z.string().min(1, "Check-out date is required"),
    guests: z.number().min(1, "Number of guests is required"),
    specialRequests: z.string().optional(),
  })
  .refine(
    (data) => {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      return checkOut > checkIn;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOutDate"],
    }
  );

type BookingFormData = z.infer<typeof bookingSchema>;

type AccommodationBookingProps = {
  accommodation: Accommodation;
};

async function createBooking(
  data: BookingFormData & { userEmail: string; accommodationID: string }
) {
  const url = new URL(
    `/api/accommodations/${data.accommodationID}/book`,
    process.env.NEXT_PUBLIC_API_URL
  );
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }
  return res.json();
}
export default function AccommodationBooking({
  accommodation,
}: AccommodationBookingProps) {
  const session = useSession();
  const userEmail = session.data?.user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    toast.promise(
      createBooking({
        ...data,
        userEmail: userEmail || "",
        accommodationID: accommodation.id,
      }),
      {
        loading: "Booking...",
        success: (data) => {
          return `Booking successful`;
        },
        error: (error) => {
          return error?.message || "Failed to create booking";
        },
      }
    );
  };

  const handleShare = () => {
    const url = `${window.location.origin}/accommodation/${accommodation.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Tour link copied to clipboard");
  };

  return (
    <div>
      <div className="lg:sticky lg:top-24 rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Booking</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("checkInDate")}
              />
              {errors.checkInDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.checkInDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Check-out Date Selection */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                placeholder="01/01/2025"
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                {...register("checkOutDate")}
              />
              {errors.checkOutDate && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.checkOutDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Guests Selection */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              No. of Guest
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                className="w-full appearance-none rounded-md border border-gray-300 p-2 text-sm"
                {...register("guests", { valueAsNumber: true })}
              />
              {errors.guests && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.guests.message}
                </p>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Special Requests
            </label>
            <textarea
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              rows={3}
              {...register("specialRequests")}
            />
            {errors.specialRequests && (
              <p className="mt-1 text-xs text-red-600">
                {errors.specialRequests.message}
              </p>
            )}
          </div>

          <div className="mb-4 text-center">
            <div className="text-xl font-bold text-green-600">
              {formatPrice(accommodation.price, accommodation.currency)}
              <span className="text-sm text-gray-500">/person/night</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Confirm Booking
            </button>
            <button
              onClick={handleShare}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <MessageCircle className="h-4 w-4" />
              Share This Accommodation
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          You must be logged in to book this accomodation. If you don't have an
          account, please{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            register
          </Link>{" "}
          or{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            login
          </Link>{" "}
          to your account.
        </div>
      </div>
    </div>
  );
}
