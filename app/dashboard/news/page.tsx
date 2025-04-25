import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { News as NewsType } from "@prisma/client";
import NewsModal from "./modal";
import { cn } from "@/lib/utils";

type NewsResponse = {
  data: NewsType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchGalleries(page: number): Promise<NewsResponse> {
    const url = new URL("/api/news", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    return res.json();
  }

  const { data: news, meta } = await fetchGalleries(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">News</h1>
        <NewsModal type="create" />
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
              title: "Type",
              dataIndex: "type",
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
              key: "actions",
              render: (value, record) => (
                <div className="flex gap-2">
                  <NewsModal type="edit" news={record} />
                </div>
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
          basePath="/dashboard/news"
        />
      </div>
    </div>
  );
}
