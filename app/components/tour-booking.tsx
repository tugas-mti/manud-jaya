"use client";

import { useSession } from "next-auth/react";
import type { Tour } from "@/app/components/tour-card";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  timeSlot: z.enum(["MORNING", "AFTERNOON", "EVENING"]),
  guests: z.number().min(1),
});

type BookingFormData = z.infer<typeof bookingSchema>;

type TourBookingProps = {
  tour: Tour;
};

async function createBooking(
  data: BookingFormData & { userEmail: string; tourId: string }
) {
  const url = new URL(
    `/api/tours/${data.tourId}/book`,
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
export default function TourBooking({ tour }: TourBookingProps) {
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
        tourId: tour.id,
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
    const url = `${window.location.origin}/tours/${tour.id}`;
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
                {...register("date")}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Time Slot
            </label>
            <div className="relative">
              <select
                className="w-full rounded-md border border-gray-300 p-2 pr-10 text-sm"
                {...register("timeSlot")}
              >
                <option value="MORNING">Morning</option>
                <option value="AFTERNOON">Afternoon</option>
                <option value="EVENING">Evening</option>
              </select>
              {errors.timeSlot && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.timeSlot.message}
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
              <select
                className="w-full appearance-none rounded-md border border-gray-300 p-2 text-sm"
                {...register("guests", { valueAsNumber: true })}
              >
                {Array.from(
                  { length: tour.maxGuests - tour.minGuests + 1 },
                  (_, i) => tour.minGuests + i
                ).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "adult" : "adults"}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.guests.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(tour.price, tour.currency)}
              <span className="text-sm text-gray-500">/person</span>
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
              Share This Activity
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          You must be logged in to book this tour. If you don't have an account,
          please{" "}
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
