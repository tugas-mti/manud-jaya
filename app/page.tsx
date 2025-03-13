import Image from "next/image";
import SearchBar from "./components/searchbar";

export default function Home() {
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
        <div className="h-screen bg-white"></div>
      </div>
    </>
  );
}
