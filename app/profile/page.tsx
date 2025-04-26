import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Table from "../components/table";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Drawer from "../components/drawer";
import { Receipt } from "../components/receipt";
import { formatCurrency } from "@/lib/utils";

export type Booking = Prisma.BookingGetPayload<{
  include: {
    tour: {
      select: {
        id: true;
        title: true;
        price: true;
        duration: true;
        images: {
          take: 1;
          select: {
            url: true;
          };
        };
      };
    };
  };
}>;

export type AccommodationBooking = Prisma.BookingAccommodationGetPayload<{
  include: {
    accommodation: {
      select: {
        id: true;
        name: true;
        price: true;
        description: true;
        images: {
          take: 1;
          select: {
            url: true;
          };
        };
      };
    };
  };
}>;

type BookingResponse = {
  data: Booking[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

type AccommodationBookingResponse = {
  data: AccommodationBooking[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

async function getMyBookings(): Promise<BookingResponse> {
  const url = new URL("/api/bookings/my", process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    headers: new Headers(await headers()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my booking");
  }
  return res.json();
}

async function getMyAccommodationBookings(): Promise<AccommodationBookingResponse> {
  const url = new URL(
    "/api/booking-accommodations/my",
    process.env.NEXT_PUBLIC_API_URL
  );
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    headers: new Headers(await headers()),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my booking");
  }
  return res.json();
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const { data: bookings } = await getMyBookings();
  const { data: accommodationBookings } = await getMyAccommodationBookings();

  if (!session) {
    return <div className="container mx-auto px-4 py-8">Unauthorized</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1  gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <p className="mb-2">
            <strong>Name:</strong> {session.user?.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {session.user?.email}
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-8">Booking History</h1>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <Table
            dataSource={bookings}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Tour",
                dataIndex: "tour",
                key: "tour",
                render: (_, record) => {
                  return (
                    <div className="flex items-center">
                      <Image
                        width={64}
                        height={64}
                        objectFit="cover"
                        src={record.tour.images[0]?.url}
                        alt={record.tour.title}
                        className="rounded-lg mr-4"
                      />
                      <div>
                        <span className="text-lg font-semibold">
                          {record.tour.title}
                        </span>
                        <p className="text-gray-500">
                          {record.guests} x {formatCurrency(record.tour.price)}
                        </p>
                      </div>
                    </div>
                  );
                },
              },
              {
                title: "Total Price",
                dataIndex: "price",
                render: (value) => formatCurrency(value),
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                render: (value) => {
                  return new Date(value).toLocaleDateString();
                },
              },
              {
                title: "Time Slot",
                dataIndex: "timeSlot",
              },
              {
                title: "# of People",
                dataIndex: "guests",
              },
              {
                title: "Status",
                dataIndex: "status",
              },
              {
                title: "Receipt",
                dataIndex: "id",
                key: "receipt",
                render: (value, record) => (
                  <Drawer>
                    <Receipt booking={record} />
                  </Drawer>
                ),
              },
            ]}
          />

          <Table
            dataSource={accommodationBookings}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Accommodation",
                dataIndex: "accommodation",
                key: "tour",
                render: (_, record) => {
                  return (
                    <div className="flex items-center">
                      <Image
                        width={64}
                        height={64}
                        objectFit="cover"
                        src={record.accommodation.images[0]?.url}
                        alt={record.accommodation.name}
                        className="rounded-lg mr-4"
                      />
                      <div>
                        <span className="text-lg font-semibold">
                          {record.accommodation.name}
                        </span>
                        <p className="text-gray-500">
                          {record.numberOfGuests} x{" "}
                          {formatCurrency(record.accommodation.price ?? 0)}
                        </p>
                      </div>
                    </div>
                  );
                },
              },
              {
                title: "Total Price",
                dataIndex: "price",
                render: (value) => formatCurrency(value),
              },
              {
                title: "Check-in Date",
                dataIndex: "checkInDate",
                render: (value) => {
                  return new Date(value).toLocaleDateString();
                },
              },
              {
                title: "Check-out Date",
                dataIndex: "checkOutDate",
                render: (value) => {
                  return new Date(value).toLocaleDateString();
                },
              },
              {
                title: "# of People",
                dataIndex: "numberOfGuests",
              },
              {
                title: "Status",
                dataIndex: "status",
              },
              {
                title: "Receipt",
                dataIndex: "id",
                key: "receipt",
                render: (value, record) => (
                  <Drawer>
                    <Receipt
                      booking={{
                        id: record.id,
                        date: record.checkInDate,
                        timeSlot: "",
                        guests: record.numberOfGuests,
                        price: record.price,
                        status: record.status,
                        tour: {
                          title: record.accommodation.name,
                          price: record.accommodation.price ?? 0,
                          duration:
                            new Date(record.checkOutDate).getTime() -
                            new Date(record.checkInDate).getTime(),
                          images: record.accommodation.images,
                        },
                      }}
                    />
                  </Drawer>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
