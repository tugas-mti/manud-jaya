import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { cn } from "@/lib/utils";
import { Tour as TourType } from "@prisma/client";
import TourModal from "./modal";

type TourResponse = {
  data: TourType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchTours(page: number): Promise<TourResponse> {
    const url = new URL("/api/tours", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch tours");
    }

    return res.json();
  }

  const { data: tours, meta } = await fetchTours(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Tours</h1>
        <TourModal type="create" />
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value, record) => `${record.currency} ${value}`,
            },
            {
              title: "Status",
              dataIndex: "published",
              render: (value) => (
                <div className="flex justify-center">
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-semibold",
                      value
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    )}
                  >
                    {value ? "Published" : "Unpublished"}
                  </span>
                </div>
              ),
            },
            {
              title: "Actions",
              dataIndex: "id",
              key: "action",
              render: (value, record) => (
                <div className="flex gap-2">
                  <TourModal type="edit" tour={record} />
                </div>
              ),
            },
          ]}
          dataSource={tours}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/dashboard/tours"
        />
      </div>
    </div>
  );
}
