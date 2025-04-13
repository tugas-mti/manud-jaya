import Image from "next/image";
import SearchBar from "./components/searchbar";
import Content from "./components/content";
import GoogleMapsReview from "./components/google-maps-review";
import VirtualGallery from "./components/virtual-gallery";
import NewsFeed from "./components/news-feed";
import TourFeed from "./components/tour-feed";
import Experience from "./components/experience";
export default function Home() {
  const text =
    "Manud Jaya Village is a hidden paradise in Kayangan Regency, Semesta Raya. This charming village offers vast green rice fields, lush hills, and crystal-clear rivers flowing amidst shady trees, making it the perfect escape from the hustle and bustle of the city. The cool and fresh air adds even more to the comfort.";
  const header = "Manud Jaya Tourism Village";
  return (
    <>
      <div className="w-full ">
        <div className="relative w-full mx-auto overflow-hidden h-[200px] md:h-[100vh]">
          <Image
            src="/images/background1.webp"
            alt="BG"
            layout="fill"
            className="relative"
            objectFit="cover"
            objectPosition="center"
          />
          <h1 className="absolute inset-0 flex justify-center text-white font-bold top-[10px] md:top-[10%] text-[3vw]">
            Welcome to Manud Jaya Tourism Village
          </h1>
          <p className="absolute inset-0 flex text-center top-[40px] md:top-[20%] mx-[30%] text-white text-[1.5vw]  leading-tight">
            Manud Jaya: The Hidden Paradise That Offers Breathtaking Natural
            Beauty and a Tranquil Atmosphere
          </p>
          <SearchBar />
        </div>
        <div className="bg-white">
          <Content header={header} text={text} image="/images/image1.jpg" />
          <div className="px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Manud Jaya Experiences</h1>
            <Experience/>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 flex flex-wrap gap-4 justify-center">
          {[1, 2, 3, 4, 6].map((number, index) => (
            <Image
              src={`/sgd/sgd-${number}.png`}
              alt={`sgd-${number}`}
              width={120}
              height={120}
              key={index}
            />
          ))}
        </div>
        <VirtualGallery />
        <NewsFeed />
        <TourFeed />
        <GoogleMapsReview />
      </div>
    </>
  );
}
