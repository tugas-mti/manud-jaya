"use client";
import { downloadCSV } from "@/lib/download-csv";
import { Booking } from "./page";

type DownloadCSVButtonProps = {
  bookings: Booking[];
};

const DownloadCSVButton = ({ bookings }: DownloadCSVButtonProps) => {
  const handleCSV = () => {
    const exported = bookings.map((booking) => {
      const newValue = {
        ...booking,
        user_name: booking.user.name,
        user_email: booking.user.email,
        tour_title: booking.tour.title,
        tour_price: booking.tour.price,
      };
      /** @ts-ignore */
      delete newValue.user;

      /** @ts-ignore */
      delete newValue.tour;

      return newValue;
    });

    /** @ts-ignore */
    downloadCSV(exported);
  };

  return (
    <button
      onClick={handleCSV}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Download CSV
    </button>
  );
};

export default DownloadCSVButton;
