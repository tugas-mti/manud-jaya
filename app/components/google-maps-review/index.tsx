import Image from "next/image";
import ShowMoreText from "../show-more-text";

interface GooglePlaceReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlaceDetailsResponse {
  result: {
    reviews: GooglePlaceReview[];
  };
  status: string;
}

const MOCK_REVIEWS: GooglePlaceReview[] = [
  {
    author_name: "Junes Tran",
    author_url:
      "https://www.google.com/maps/contrib/111658689603185125635/reviews",
    language: "en",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/ALV-UjVaJ-Tfwil7xWbiYua5NVK70owLXosvehq6u-5183Nn-SLOsrRn=s128-c0x00000000-cc-rp-mo-ba4",
    rating: 5,
    relative_time_description: "a month ago",
    text: "Jatiluwih Rice Terraces: A Peaceful Escape into Bali’s Heart\n\nJatiluwih Rice Terraces, a UNESCO World Heritage site, offers a breathtaking glimpse into Bali’s agricultural heritage and natural beauty. Situated in the cool highlands of Tabanan Regency, the terraces are a living testament to the island’s traditional “subak” irrigation system, which has sustained these lush landscapes for centuries.\n\nI recently explored the area by taking the Orange Trail, a scenic route that promised panoramic views of the rice paddies. While the map estimated the hike would take 1.5 to 2 hours, I managed to complete it in about 50 minutes, moving at a steady yet relaxed pace. The path winds through vibrant green fields, alongside flowing irrigation channels, and past small huts that dot the terraces. The tranquility of the surroundings was unmatched, and the gentle rustling of the rice plants in the breeze added to the peaceful atmosphere.\n\nWhat truly stood out to me was the warmth of the local farmers. As I walked, many were busy tending to their crops, but they always took a moment to greet me with a smile or a friendly “hello.” Their presence made the experience feel authentic and connected, a reminder that these terraces are not just a tourist attraction but a vital part of the local way of life.\n\nWhile the trail was mostly manageable, some sections were quite slippery, especially where the ground was damp. I would highly recommend wearing proper non-slip shoes to ensure a safe and comfortable walk. The effort is worth it, though, as every turn reveals a new angle of the terraces, each more stunning than the last.\n\nOverall, Jatiluwih Rice Terraces is a must-visit for anyone looking to immerse themselves in Bali’s culture and natural beauty. Whether you’re there for a leisurely hike or simply to soak in the views, it’s an experience that stays with you long after you leave.",
    time: 1737973747,
  },
  {
    author_name: "Burcu Seran",
    author_url:
      "https://www.google.com/maps/contrib/100199869295167393350/reviews",
    language: "en",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/ALV-UjVZZhxodScFFCGr0y70AM7xPOcjh8rQ04dA9kQ4tGG0gwi0td9_=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relative_time_description: "a week ago",
    text: "This is a wonderful place—highly recommended! You could easily spend hours trekking through this stunning landscape. The lush green rice terraces stretch as far as the eye can see, offering breathtaking views and a peaceful atmosphere. The well-maintained trails allow for an immersive experience, whether you're looking for a short stroll or a longer hike through the terraces. A must-visit for nature lovers and trekking enthusiasts!",
    time: 1741606516,
  },
  {
    author_name: "Tom Dobler",
    author_url:
      "https://www.google.com/maps/contrib/108912046843441582415/reviews",
    language: "en",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/ALV-UjVMV9Rnmradpl7k17PIT09jy9gIq0xY8XW5HLwC9OT3s6lnrs__Ng=s128-c0x00000000-cc-rp-mo-ba6",
    rating: 5,
    relative_time_description: "a month ago",
    text: "Jatiluwih Rice Terraces 🌟🌟🌟🌟🌟\n\nThe Jatiluwih Rice Terraces are a breathtaking example of Bali’s natural beauty and cultural heritage! 🌾✨ These traditional rice terraces are a UNESCO World Heritage site and showcase the island’s unique and ancient irrigation system, Subak.\n\nThe views are absolutely stunning – endless layers of vibrant green fields stretch across the landscape, creating a serene and picturesque atmosphere. 🌿🌄 It’s a perfect spot for nature lovers, photographers, or anyone looking to experience Bali’s agricultural traditions up close.\n\nThe area is well-maintained, with walking paths that allow you to explore the terraces at your own pace. The peaceful environment makes it an ideal place to relax and connect with nature. 😊\n\n📍Location: Located in Tabanan Regency, it’s easy to access and well worth the drive.\n💵 Entry Fee: Affordable, and the funds help support the local community and maintain the site.\n\nPro Tip: Visit in the early morning or late afternoon for cooler weather and the best lighting for photos. Wear comfortable shoes if you plan to walk through the terraces!\n\nHighly recommended for its beauty, tranquility, and cultural significance. Jatiluwih Rice Terraces are a must-visit destination in Bali! 🌴🌾",
    time: 1737695937,
  },
  {
    author_name: "anicetus venan",
    author_url:
      "https://www.google.com/maps/contrib/101528400944771292872/reviews",
    language: "en",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/ALV-UjX4CdNxmsotqQT9t5ateXrKdYsZQAYqsPk1UUjhBMbyykRAs-ko=s128-c0x00000000-cc-rp-mo-ba2",
    rating: 5,
    relative_time_description: "a month ago",
    text: "A great place to visit! The staff is friendly, the food is delicious, and the view is beautiful. However, the overhead cables can be a bit distracting when trying to take photos.\nStill, it's a wonderful spot to relax and enjoy the surroundings!",
    time: 1739022455,
  },
  {
    author_name: "Anantha Padmanabhan V S",
    author_url:
      "https://www.google.com/maps/contrib/101857494080038242961/reviews",
    language: "en",
    profile_photo_url:
      "https://lh3.googleusercontent.com/a-/ALV-UjX_jTAcPRwdDJsYwiCB8qkQ5OV31wV9wlu80CSZAntLmAw3OBT9nQ=s128-c0x00000000-cc-rp-mo-ba4",
    rating: 5,
    relative_time_description: "2 months ago",
    text: "Jatiluwih Rice Terrace is truly stunning and one of the most peaceful places I’ve visited. The natural beauty of the endless green fields is breathtaking, and walking through the area is such a calming experience. It’s a place that leaves a lasting impression, and I’d highly recommend it to anyone visiting Bali",
    time: 1736749447,
  },
];
async function GoogleMapsReview() {
  const generateProfilePhotoUrl = (name: string) =>
    `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
      name
    )}`;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8">Review your experiences</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_REVIEWS?.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={generateProfilePhotoUrl(review.author_name)}
                  alt={review.author_name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{review.author_name}</h3>
                  <p className="text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
              <ShowMoreText text={review.text} />
            </div>
          ))}
        </div>
      </div>
      <iframe
        style={{ border: 0, width: "100%", height: 600 }}
        title="Village, Jl. Jatiluwih Kawan No.Desa, Jatiluwih, Kec. Penebel, Kabupaten Tabanan, Bali 82152"
        aria-label="Village, Jl. Jatiluwih Kawan No.Desa, Jatiluwih, Kec. Penebel, Kabupaten Tabanan, Bali 82152"
        allow="autoplay; encrypted-media; gyroscope;"
        src="https://maps.google.com/maps?q=Village%2C%20Jl.%20Jatiluwih%20Kawan%20No.Desa%2C%20Jatiluwih%2C%20Kec.%20Penebel%2C%20Kabupaten%20Tabanan%2C%20Bali%2082152&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near"
      />
    </div>
  );
}

export default GoogleMapsReview;
