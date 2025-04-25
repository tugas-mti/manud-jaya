import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { Gallery as GalleryType } from "@prisma/client";
import Image from "next/image";
import GalleryModal from "./modal";
import YoutubeModal from "./youtube-modal";
import { cn } from "@/lib/utils";

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
      throw new Error("Failed to fetch galleries");
    }

    return res.json();
  }

  async function fetchYoutube(): Promise<{ data: { url: string } }> {
    const url = new URL("/api/youtube", process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch youtube");
    }

    return res.json();
  }

  const { data: news, meta } = await fetchGalleries(currentPage);
  const { data: youtube } = await fetchYoutube();

  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Galleries</h1>
        <div className="flex gap-2">
          <YoutubeModal youtube={youtube} />
          <GalleryModal type="create" />
        </div>
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
                  <GalleryModal type="edit" gallery={record} />
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
          basePath="/dashboard/galleries"
        />
      </div>
    </div>
  );
}
