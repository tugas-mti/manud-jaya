import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { News as NewsType } from "@prisma/client";

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
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "title",
            },
            {
              title: "Email",
              dataIndex: "type",
            },
            {
              title: "Action",
              dataIndex: "id",
              key: "action",
              render: (value, record) => (
                <div className="space-x-2">
                  <a
                    href={`/dashboard/news/${value}`}
                    className="text-blue-500 hover:underline"
                  >
                    Detail
                  </a>
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
