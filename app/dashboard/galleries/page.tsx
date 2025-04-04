import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { Gallery as GalleryType } from "@prisma/client";
import Image from "next/image";

type GalleryResponse = {
  data: GalleryType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchGalleries(page: number): Promise<GalleryResponse> {
    const url = new URL("/api/galleries", process.env.NEXT_PUBLIC_API_URL);
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
              title: "Image",
              dataIndex: "image",
              render: (value, record) => (
                <Image
                  src={value}
                  width={100}
                  height={100}
                  alt={record.title}
                />
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
          basePath="/dashboard/galleries"
        />
      </div>
    </div>
  );
}
