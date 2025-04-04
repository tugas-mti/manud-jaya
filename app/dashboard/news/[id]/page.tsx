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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const news = await getNewsDetail(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          <a href="/dashboard/news">Back</a>
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          <a href={`/dashboard/news/edit/${news.id}`}>Edit</a>
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
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
    </div>
  );
}
