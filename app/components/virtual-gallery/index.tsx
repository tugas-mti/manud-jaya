import Image from "next/image";
import Gallery from "../gallery";

export default function VirtualGallery() {
  return (
    <div>
      <div className="relative shadow-lg">
        <div className="relative w-full h-[400px] bg-gradient-to-b from-emerald-600 to-emerald-400 overflow-hidden">
          <div className="absolute top-0 left-0 w-full">
            <svg
              className="w-full h-20 fill-white"
              viewBox="0 0 720 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
              />
            </svg>
          </div>

          <div className="absolute inset-0 z-10 mix-blend-overlay">
            <Image
              src="/images/background1.webp"
              alt="BG"
              layout="fill"
              className="relative"
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-white text-center max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Virtual Gallery
              </h1>
              <p className="text-2xl opacity-90  text-center">
                Explore our amazing collection
              </p>
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 bottom-[-120] z-30 flex items-center justify-center">
          <iframe
            className="rounded-lg border-4 border-white"
            width="480"
            height="240"
            src="https://www.youtube.com/embed/EPO_J4yvDzs"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
      <div className="h-[120px]" />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8">Photos Gallery</h2>
        <p className="text-center text-gray-600 mb-8">
          Explore our amazing collection of images of Manud Jaya
        </p>
        <Gallery />
      </div>
    </div>
  );
}
