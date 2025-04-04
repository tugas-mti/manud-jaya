import Image from "next/image";
import QRCode from "react-qr-code";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Scissors } from "lucide-react";

interface BookingProps {
  booking: {
    id: string;
    date: Date;
    timeSlot: string;
    guests: number;
    price: number;
    status: string;
    tour: {
      title: string;
      price: number;
      duration: number;
      images: { url: string }[];
    };
  };
}

export function Receipt({ booking }: BookingProps) {
  // Format date for display
  const formattedDate = formatDate(new Date(booking.date));

  // Calculate total price (price per person × number of guests)
  const totalPrice = booking.tour.price * booking.guests;

  // Convert minutes to hours for duration
  const durationHours = booking.tour.duration / 60;

  return (
    <div className="relative max-w-sm mx-auto">
      {/* Skeuomorphic paper effect with shadow */}
      <div className="relative bg-[#f8f5f0] shadow-xl rounded-sm overflow-hidden">
        {/* Jagged edge at top */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#f8f5f0] z-10">
          <svg width="100%" height="12" className="absolute top-0 left-0">
            <path
              d="M0,0 L0,12 L5,12 L10,0 L15,12 L20,0 L25,12 L30,0 L35,12 L40,0 L45,12 L50,0 L55,12 L60,0 L65,12 L70,0 L75,12 L80,0 L85,12 L90,0 L95,12 L100,0 L105,12 L110,0 L115,12 L120,0 L125,12 L130,0 L135,12 L140,0 L145,12 L150,0 L155,12 L160,0 L165,12 L170,0 L175,12 L180,0 L185,12 L190,0 L195,12 L200,0 L205,12 L210,0 L215,12 L220,0 L225,12 L230,0 L235,0 L240,0 L245,12 L250,0 L255,12 L260,0 L265,12 L270,0 L275,12 L280,0 L285,12 L290,0 L295,12 L300,0 L305,12 L310,0 L315,0 L320,12 L325,0 L330,0 L335,12 L340,0 L345,12 L350,0 L355,12 L360,0 L365,12 L370,0 L375,12 L380,0 L385,12 L390,0 L395,12 L400,0"
              fill="#f8f5f0"
            />
          </svg>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rotate-[-30deg] text-[#e0dcd3] text-7xl font-bold opacity-20 select-none">
            VERIFIED
          </div>
        </div>

        <div className="pt-6 px-8 pb-8 relative">
          {/* Receipt header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-mono">
              BOOKING RECEIPT
            </h1>
            <div className="mt-2 text-sm text-gray-700 font-mono">
              Booking ID: {booking.id}
            </div>
            <div className="mt-1 border-b border-gray-300 w-full"></div>
          </div>

          {/* Tour title */}
          <h2 className="text-2xl font-bold text-center mb-4 font-mono">
            {booking.tour.title}
          </h2>

          {/* Tour image with subtle frame */}
          <div className="relative h-48 mb-6 border-4 border-[#e8e3dc] shadow-sm">
            <Image
              src={booking.tour.images[0].url || "/placeholder.svg"}
              alt={booking.tour.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Booking details with typewriter font */}
          <div className="space-y-2 font-mono">
            <div className="flex">
              <span className="w-24 text-gray-700">Date:</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-700">Time:</span>
              <span className="font-medium">
                {booking.timeSlot.charAt(0) +
                  booking.timeSlot.slice(1).toLowerCase()}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-700">Guests:</span>
              <span className="font-medium">{booking.guests}</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-700">Duration:</span>
              <span className="font-medium">{durationHours} hours</span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-700">Price:</span>
              <span className="font-medium">
                Rp {formatCurrency(booking.price)}
              </span>
            </div>
            <div className="flex">
              <span className="w-24 text-gray-700">Status:</span>
              <span
                className={`font-medium ${
                  booking.status === "PENDING"
                    ? "text-amber-600"
                    : "text-green-600"
                }`}
              >
                {booking.status.charAt(0) +
                  booking.status.slice(1).toLowerCase()}
              </span>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-300 w-full"></div>

          {/* Paper cutter style */}
          <div className="relative my-6">
            <div className="absolute left-0 right-0 border-t border-dashed border-gray-400"></div>
            <div className="absolute -right-2 -top-3 bg-[#f8f5f0] p-1 rounded-full">
              <Scissors size={16} className="text-gray-500" />
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-6">
            <QRCode
              value={booking.id}
              size={120}
              bgColor={"#f8f5f0"}
              fgColor={"#1a1a1a"}
              level={"L"}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </div>

          {/* Additional receipt details */}
          <div className="mt-6 text-xs text-center text-gray-500 font-mono">
            <p>Please present this receipt upon arrival</p>
            <p className="mt-1">Thank you for booking with us!</p>
          </div>
        </div>

        {/* Jagged edge at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#f8f5f0] z-10">
          <svg width="100%" height="12" className="absolute bottom-0 left-0">
            <path
              d="M0,12 L0,0 L5,0 L10,12 L15,0 L20,12 L25,0 L30,12 L35,0 L40,12 L45,0 L50,12 L55,0 L60,12 L65,0 L70,12 L75,0 L80,12 L85,0 L90,12 L95,0 L100,12 L105,0 L110,12 L115,0 L120,12 L125,0 L130,12 L135,0 L140,12 L145,0 L150,12 L155,0 L160,12 L165,0 L170,12 L175,0 L180,12 L185,0 L190,12 L195,0 L200,12 L205,0 L210,12 L215,0 L220,12 L225,0 L230,12 L235,0 L240,12 L245,0 L250,12 L255,0 L260,12 L265,0 L270,12 L275,0 L280,12 L285,0 L290,12 L295,0 L300,12 L305,0 L310,12 L315,0 L320,12 L325,0 L330,12 L335,0 L340,12 L345,0 L350,12 L355,12 L360,12 L365,0 L370,12 L375,0 L380,0 L385,12 L390,0 L395,12 L400,12"
              fill="#f8f5f0"
            />
          </svg>
        </div>
      </div>

      {/* Subtle shadow underneath for 3D effect */}
      <div className="absolute inset-0 -z-10 translate-y-1 translate-x-1 bg-gray-300 rounded-sm"></div>
    </div>
  );
}
