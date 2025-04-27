import Image from "next/image";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

export default function SocialMedia() {
  return (
    <>
      <div className="container mx-auto p-4 space-y-8">
        {/* Main Title */}
        <h2 className="text-3xl font-bold mb-8 text-center">
          Follow Us on Our Social Media
        </h2>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 space-y-12">
          {/* Instagram Section */}
          <section className="flex flex-col items-center space-y-4 w-full">
            {/* Instagram Logo and Name */}
            <div className="flex items-center space-x-2">
              <Image
                src="/socials/instagram.png"
                alt="Instagram Logo"
                width={30}
                height={30}
              />
              <h2 className="text-2xl font-semibold">
                @ManudJayaTourismVillage
              </h2>
            </div>

            {/* Instagram Feed */}
            <iframe
              src="https://bc06ec0a3b7e459d813776546c13db9b.elf.site/"
              style={{ border: "none", overflow: "hidden" }}
              allow="encrypted-media"
              loading="lazy"
              className="w-full h-[330px]"
              scrolling="no"
            />
          </section>

          {/* TikTok Section */}
          <section className="flex flex-col items-center space-y-4 w-full">
            {/* TikTok Logo and Name */}
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faTiktok} />
              <h2 className="text-2xl font-semibold">
                @ManudJayaTourismVillage
              </h2>
            </div>

            {/* TikTok Feed */}
            <iframe
              src="https://10d740aa190b4d0eb0e620904e081e88.elf.site"
              style={{ border: "none", overflow: "hidden" }}
              allow="encrypted-media"
              loading="lazy"
              className="w-full h-[350px]"
              scrolling="no"
            />
          </section>

          {/* TikTok Script */}
          <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
        </div>
      </div>
    </>
  );
}
