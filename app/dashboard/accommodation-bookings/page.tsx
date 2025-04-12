import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import ChangeStatus from "./change-status";
import Drawer from "@/app/components/drawer";
import { Receipt } from "@/app/components/receipt";
import { formatCurrency } from "@/lib/utils";

export type AccommodationBooking = Prisma.BookingAccommodationGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
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
  data: AccommodationBooking[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function Bookingpage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchBookings(page: number): Promise<BookingResponse> {
    const url = new URL(
      "/api/booking-accommodations",
      process.env.NEXT_PUBLIC_API_URL
    );
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch booking accommodations");
    }

    return res.json();
  }

  const { data: news, meta } = await fetchBookings(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Accommodation Booking</h1>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              title: "User",
              dataIndex: "user",
              key: "user",
              render: (_, record) => {
                return (
                  <div className="flex items-center">
                    <div>
                      <span className="text-lg font-semibold">
                        {record.user.name}
                      </span>
                      <p className="text-gray-500">{record.user.email}</p>
                    </div>
                  </div>
                );
              },
            },
            {
              title: "Accommodation",
              dataIndex: "accommodation",
              key: "accommodation",
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
                        {formatCurrency(record.accommodation.price)}
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
              title: "Actions",
              dataIndex: "id",
              key: "actions",
              render: (value) => {
                return <ChangeStatus bookingId={value} />;
              },
            },
            {
              title: "Receipt",
              dataIndex: "id",
              key: "receipt",
              render: (_, record) => (
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
                        price: record.accommodation.price,
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
          dataSource={news}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/dashboard/accommodation-bookings"
        />
      </div>
    </div>
  );
}
