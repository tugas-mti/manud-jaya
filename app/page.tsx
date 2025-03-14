import Image from "next/image";
import SearchBar from "./components/searchbar";
import Content from "./components/content";
export default function Home() {
  const text = "Manud Jaya Village is a hidden paradise in Kayangan Regency, Semesta Raya. This charming village offers vast green rice fields, lush hills, and crystal-clear rivers flowing amidst shady trees, making it the perfect escape from the hustle and bustle of the city. The cool and fresh air adds even more to the comfort.";
  const header = "Manud Jaya Tourism Village";
  return (
    <>
      <div className="w-full ">
        <div className="relative">
          <div className="relative w-full mx-auto overflow-hidden h-[200px] md:h-[100vh]">
            <Image
              src="/images/background1.webp"
              alt="BG"
              layout="fill"
              className="relative"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <h1 className="absolute inset-0 flex justify-center text-white font-bold top-[10%] text-[3vw]">
            Welcome to Manud Jaya Tourism Village
          </h1>
          <p className="absolute inset-0 flex text-center top-[20%] mx-[30%] text-white text-[1.5vw]  leading-tight">
            Manud Jaya: The Hidden Paradise That Offers Breathtaking Natural
            Beauty and a Tranquil Atmosphere
          </p>
          <SearchBar />
        </div>
        <div className="h-screen bg-white">
          <Content header={header} text={text} image="/images/image1.jpg"/>
        </div>
      </div>
    </>
  );
}
