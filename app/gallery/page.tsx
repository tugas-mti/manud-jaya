import React from "react";
import Image from "next/image";
import Gallery from "../components/gallery";
import Pagination from "../components/pagination";

import { Gallery as GalleryType } from "@prisma/client";

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
  const limit = 9;

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

  const { data: galleries, meta } = await fetchGalleries(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <div>
      <div className="relative w-full mx-auto overflow-hidden min-h-[240px]">
        <Image
          src="/images/background1.webp"
          alt="BG"
          layout="fill"
          className="relative"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute text-center text-white container mx-auto my-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-3xl">Gallery</h1>
          <p className="text-sm md:text-xl leading-tight">
            Explore our gallery and discover the beauty of our destination! From
            stunning landscapes to vibrant culture, let these images inspire
            your next adventure.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <Gallery
          showAlt
          photos={galleries.map((item, index) => ({
            src: item.image,
            alt: item.description,
            width: 1280,
            height: 720,
            key: String(index),
          }))}
        />
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/gallery"
          />
        </div>
      </div>
    </div>
  );
}
