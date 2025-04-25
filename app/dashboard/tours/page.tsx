import Pagination from "@/app/components/pagination";
import RichTextEditor from "@/app/components/rich-text-editor";
import Table from "@/app/components/table";
import { Tour as TourType } from "@prisma/client";

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
      <h1 className="text-2xl font-bold mb-4">Tours</h1>
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
                <span>{value ? "Published" : "Unpublished"}</span>
              ),
            },
            {
              title: "Actions",
              dataIndex: "id",
              key: "action",
              render: (value) => (
                <div className="space-x-2">
                  <a
                    href={`/dashboard/tours/${value}`}
                    className="text-blue-500 hover:underline"
                  >
                    Detail
                  </a>
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
