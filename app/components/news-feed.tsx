"use client";

import { News } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type NewsResponse = {
  data: News[];
  meta: { total: number; page: number; limit: number };
};
async function fetchNews(): Promise<NewsResponse> {
  const url = new URL("/api/news", process.env.NEXT_PUBLIC_API_URL);
  url.searchParams.append("page", "1");
  url.searchParams.append("limit", "4");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}

export default function NewsFeed() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function getNews() {
      try {
        const { data } = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    getNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">News on Manud Jaya</h1>
        <Link
          href="/news"
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          See all news
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="h-[240px] bg-gray-200 animate-pulse rounded shadow-lg mb-4" />
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              </div>
            ))}
          </>
        ) : (
          <>
            {news.map((item) => (
              <div
                key={item.id}
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
                <Link
                  href={`/news/${item.id}`}
                  className="border border-gray-300 rounded px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Read more
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
