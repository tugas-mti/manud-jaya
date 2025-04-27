"use client";
import Image from "next/image";
import { useState } from "react";
import DetailModal from "./detail";

type ItemData = {
  title: string;
  image: string;
  description: string;
};

const Experience = () => {
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const items: ItemData[] = [
    {
      title: "Hills Tracking - Trekking sawah dan bukit",
      image: "/images/tracking.jpeg",
      description:
        "One of our most beloved experiences is the Hill and Rice Field Trekking. This serene nature escape takes you deep into the heart of Manud Jaya's green soul. Each step winds through vibrant paddy fields, gentle slopes, and hidden trails — where the only sounds you hear are the rustling of leaves and the distant calls of birds. It's the perfect way to unplug, breathe in the crisp mountain air, and take in panoramic views that stretch as far as the eye can see.\n\n" +
        "Along the way, you'll pass local farmers tending to their crops, water buffalo grazing peacefully, and hand-built irrigation canals that have nourished these lands for generations. Our guides will share stories of the land, traditions passed down, and the intimate relationship between people and nature here.\n\n" +
        "Our curated tours are designed for every kind of traveler — whether you seek adventure, relaxation, cultural discovery, or simply a break from the ordinary.\n\n" +
        "Join a sunrise trekking tour, a village cycling route, or a culinary walk where every stop reveals a new flavor, a new smile, a new story.",
    },
    {
      title: "Lake - Danau wisata",
      image: "/images/danau.jpeg",
      description:
        "Lake view offers a breathtaking experience, where every step reveals shimmering waters framed by lush landscapes, creating a perfect blend of adventure and tranquility amidst nature's beauty.\n\n" +
        "Visitors can enjoy gentle walks along the lakeside trails, where the calm breeze and reflections of the surrounding mountains create a magical, mirror-like view. It's the ideal setting for nature photography, quiet meditation, or simply pausing to absorb the peaceful rhythm of rural life.\n\n" +
        "For the more adventurous, there are canoe rides or bamboo rafts available, giving guests a chance to explore the lake from a different perspective. Local guides often share stories and folklore tied to the lake, adding a layer of culture and mysticism to the journey.",
    },
    {
      title: "Pool - Kolam Renang",
      image: "/images/pool.jpeg",
      description:
        "Our swimming pool provides a refreshing retreat surrounded by natural beauty, where guests can unwind, enjoy the cool water, and relax with stunning views that enhance the serene atmosphere.\n\n" +
        "The pool is designed to blend into the landscape, with natural stone, lush gardens, and traditional architecture all around. Whether you're taking an early morning dip with the mist still floating over the hills or cooling off in the afternoon sun, the experience is both soothing and scenic.\n\n" +
        "Families love this spot for its relaxing setting and open space for kids to splash around safely. There are shaded lounging areas for those who prefer to rest, and fresh drinks or local snacks are often served poolside by nearby vendors — turning a simple swim into a full relaxation ritual.",
    },
  ];
  return (
    <>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-6">
          {/* Card 1 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
            <Image
              src="/images/tracking.jpeg"
              alt="Hills Tracking"
              width={300}
              height={180}
              className="rounded-md object-cover"
            />
            <h2 className="mt-4 font-semibold">
              Hills Tracking - Trekking sawah dan bukit
            </h2>
            <p className="text-sm text-justify mt-2">
              Hill and rice field trekking offers a serene nature escape, where
              each step takes you through lush green paddies and scenic hills,
              allowing you to breathe in the fresh air and soak in the stunning
              natural landscapes.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setSelectedItem(items[0])}
            >
              Read More
            </button>
            {selectedItem?.title.includes("Hills") && (
              <DetailModal
                data={items[0]}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>

          {/* Card 2 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
            <Image
              src="/images/danau.jpeg"
              alt="Lake"
              width={300}
              height={180}
              className="rounded-md object-cover"
            />
            <h2 className="mt-4 font-semibold">Lake - Danau wisata</h2>
            <p className="text-sm text-justify mt-2">
              lake view offers a breathtaking experience, where every step
              reveals shimmering waters framed by lush landscapes, creating a
              perfect blend of adventure and tranquility amidst nature's beauty.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setSelectedItem(items[1])}
            >
              Read More
            </button>
            {selectedItem?.title.includes("Lake") && (
              <DetailModal
                data={items[1]}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>

          {/* Card 3 */}
          <div className="min-w-[300px] bg-white shadow-md rounded-lg p-4">
            <Image
              src="/images/pool.jpeg"
              alt="Pool"
              width={300}
              height={180}
              className="rounded-md object-cover"
            />
            <h2 className="mt-4 font-semibold">Pool – Kolam Renang</h2>
            <p className="text-sm text-justify mt-2">
              Our swimming pool provides a refreshing retreat surrounded by
              natural beauty, where guests can unwind, enjoy the cool water, and
              relax with stunning views that enhance the serene atmosphere.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              onClick={() => setSelectedItem(items[2])}
            >
              Read More
            </button>
            {selectedItem?.title.includes("Pool") && (
              <DetailModal
                data={items[2]}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Experience;
