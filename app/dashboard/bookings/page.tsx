import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import ChangeStatus from "./change-status";
import Drawer from "@/app/components/drawer";
import { Receipt } from "@/app/components/receipt";
import { formatCurrency } from "@/lib/utils";

export type Booking = Prisma.BookingGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
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

type BookingResponse = {
  data: Booking[];
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
    const url = new URL("/api/bookings", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    return res.json();
  }

  const { data: news, meta } = await fetchBookings(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tour Booking</h1>
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
                  <Receipt booking={record} />
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
          basePath="/dashboard/bookings"
        />
      </div>
    </div>
  );
}
