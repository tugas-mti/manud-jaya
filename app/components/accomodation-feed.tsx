"use client";
import { useState, useEffect } from "react";
import DetailModal from "./experience/detail";

type ItemData = {
  id: number;
  title: string;
  image: string;
  description: string;
  altText: string;
};

async function fetchAccommodations(): Promise<ItemData[]> {
  const url = new URL(
    "/api/accommodations?published=true",
    process.env.NEXT_PUBLIC_API_URL
  );
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch accommodations");

  const data = await res.json();
  const mappedData: ItemData[] = data.data.map((item: any) => ({
    id: item.id,
    title: item.name,
    image: item.images?.[0]?.url || "", // fallback to empty string if no image
    description: item.description.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n"),
    altText: item.images[0].altText,
  }));

  return mappedData;
}

export default function AccomodationFeed() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAccommodations();
        setItems(data); // set the state
      } catch (error) {
        console.error("Error fetching accommodations", error);
      } finally {
        setLoading(false); // hide loading state
      }
    }

    loadData(); // call it
  }, []); // empty dependency array = only runs once on mount

  return (
    <div className="px-6 py-12 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manud Jaya Accommodation</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {items.map((accommodation: any) => (
          <div
            key={accommodation.id}
            className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md"
          >
            <img
              src={accommodation.image}
              alt={accommodation.altText}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {accommodation.title}
              </h2>
              <div
                className="text-sm text-gray-600 mb-3 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: accommodation.description }}
              />
              <button
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setSelectedItem(accommodation)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <DetailModal
          data={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
