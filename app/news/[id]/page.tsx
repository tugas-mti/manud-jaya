import React from "react";
import Image from "next/image";
import { News } from "@prisma/client";

async function getNewsDetail(id: string): Promise<News> {
  const url = new URL(`/api/news/${id}`, process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch news detail");
  }

  return res.json();
}

async function getNews(): Promise<{ data: News[] }> {
  const url = new URL("/api/news", process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }
  return res.json();
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const news = await getNewsDetail(id);
  const otherNews = await getNews();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="prose prose-lg max-w-none lg:col-span-2">
          <div className="relative w-full h-[480px] mb-8">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-8">{news.title}</h1>
          <div className="flex space-x-4 mb-4">
            <span className="text-gray-600">
              {news.type.charAt(0).toUpperCase() + news.type.slice(1)}
            </span>
            <span className="text-gray-600 mb-4">
              {new Date(news.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div
            className="prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-600"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        <aside className="lg:sticky lg:top-8 h-fit">
          <h2 className="text-2xl font-bold mb-4">More News</h2>
          <div className="space-y-4">
            {otherNews?.data
              ?.filter((item) => item.id !== news.id)
              .slice(0, 5)
              .map((item) => (
                <a
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="block group"
                >
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <h3 className="font-semibold transition-colors">
                    {item.title}
                  </h3>
                </a>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
