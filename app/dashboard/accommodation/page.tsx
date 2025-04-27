import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { cn } from "@/lib/utils";
import { Accommodation } from "@prisma/client";
import AccommodationModal from "./modal";

type AccommodationResponse = {
  data: Accommodation[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function AccommodationPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchAccommodations(
    page: number
  ): Promise<AccommodationResponse> {
    const url = new URL("/api/accommodations", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch accommodations");
    }

    return res.json();
  }

  const { data: accommodations, meta } = await fetchAccommodations(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Accommodations</h1>
        <AccommodationModal type="create" />
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value, record) => `${record.currency || "IDR"} ${value}`,
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
                  <AccommodationModal type="edit" accommodation={record} />
                </div>
              ),
            },
          ]}
          dataSource={accommodations}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/dashboard/accommodation"
        />
      </div>
    </div>
  );
}
