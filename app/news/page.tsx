import React from "react";
import Image from "next/image";
import Pagination from "../components/pagination";

import { News as NewsType } from "@prisma/client";
import Link from "next/link";

type GalleryRespsonse = {
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
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;

  async function fetchGalleries(page: number): Promise<GalleryRespsonse> {
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
  const headline = news?.[0];
  const otherNews = news.length > 1 ? news.slice(1) : [];

  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">News</h1>
      {headline && (
        <Link className="mb-8 relative" href={`/news/${headline.id}`}>
          <Image
            src={headline.image}
            alt={headline.title}
            width={800}
            height={400}
            className="rounded shadow-lg mb-4 w-full md:h-[520px] h-[240px] object-cover"
          />
          <div className="absolute md:bottom-4 md:left-4 bottom-0 left-0 text-white bg-black bg-opacity-50 p-2 rounded">
            <h2 className="text-2xl font-semibold">{headline.title}</h2>
            <div className="flex space-x-4">
              <span>
                {headline.type.charAt(0).toUpperCase() + headline.type.slice(1)}
              </span>
              <span>
                {new Date(headline.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </Link>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherNews.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={200}
              className="rounded shadow-lg mb-4 w-full h-[240px] object-cover"
            />
            <h3 className="text-lg font-bold">{item.title}</h3>
            <div className="flex space-x-4 mb-4">
              <span className="text-gray-600">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
              <span className="text-gray-600 mb-4">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/news"
        />
      </div>
    </div>
  );
}
