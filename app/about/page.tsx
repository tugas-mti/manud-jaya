import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full ">
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
            <h1 className="font-bold text-3xl">Manud Jaya Tourism Village</h1>
            <p className="text-sm md:text-xl leading-tight">
              Manud Jaya: The Hidden Paradise That Offers Breathtaking Natural
              Beauty and a Tranquil Atmosphere
            </p>
          </div>
        </div>
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
          {/* Profile Section */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-4">Profile</h2>
              <p className="text-justify text-gray-800 leading-relaxed">
              Manud Jaya Tourist Village is one of the villages located in the administrative area of Kayangan Regency, Semesta Raya, Indonesia. The village was officially established in 1960, but its origins go back long before that. The name "Manud Jaya Tourist" has a deep philosophical meaning. The word "Turis" comes from the local language which means wanderer or traveler, while "Manud" means to follow or trace, and "Jaya" means glory or prosperity. Overall, the name of this village reflects the spirit of its community to continue to grow by following in the footsteps of the goodness and success of the past.
              </p>
            </div>
            <img
              src="/images/image1.jpg"
              alt="Profile"
              width={438}
              height={438}
              className="rounded-lg object-fill"
            />
          </section>

          {/* History Section */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <img
              src="/images/history.jpeg"
              alt="History"
              width={438}
              height={438}
              className="rounded-lg object-fill"
            />
            <div>
              <h2 className="text-4xl font-bold mb-4">History</h2>
              <p className="text-justify text-gray-800 leading-relaxed">
              In the early days, this area was a wilderness inhabited by wildlife and was used as a hunting ground by residents from surrounding villages. Over time, some families from the tribe 'Eve' began to clear land and settle there. People's lives at that time were highly dependent on nature: farming, gathering, and hunting. In its development, Manud Jaya Tourist Village began to be known as a stopover point for traders and travelers because of its strategic location on local trade routes. This is where the term "manud tourist" came from - describing the large number of people who come and follow the flow of trade and culture in this village. The local government then inaugurated this village under the name Tourism Manud Jaya, as a recognition of the spirit of its citizens who are open to progress and interaction with the outside world.
              </p>
            </div>
          </section>
          {/* Culture Section */}
          <section className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Culture</h2>
              <p className="text-justify text-gray-800 leading-relaxed">
              Manud Jaya Tourist Village is known as a village that is rich in unique local culture and is still sustainable today. The village community strongly upholds the values of ancestral traditions that are inherited from generation to generation. Here are some of the typical cultures that are the identity of Manud Jaya Tourist Village:
              </p>
            </div>
            {/* Cultures*/}
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-start ">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                      1. Traditional Ceremony "Ngiring Srawung"
                  </h2>
                  <p className="mb-4 text-justify">
                  This ceremony is a form of welcoming guests or travelers who come to the village. The word Ngiring Srawung means "to accompany companionship," where guests are considered part of the big village family. This event is usually accompanied by traditional music, welcome dances, and village food banquets.
                  </p>
                </div>
                <Image 
                  src="/images/ngiring-srawung.jpeg" 
                  alt="Ngiring Srawung" 
                  width={442} 
                  height={308} 
                  className="rounded-lg object-fill" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <Image 
                  src="/images/manud-jaya-dance.jpeg" 
                  alt="manud-jaya dance" 
                  width={442} 
                  height={308} 
                  className="rounded-lg object-fill" 
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                  2. “Manud Jaya” Dance
                  </h2>
                  <p className="mb-4 text-justify">
                  This dance was created by local artists as a symbol of the life journey of the village community—following (manud) the trail of goodness to glory (jaya). This dance movement depicts the spirit of mutual cooperation, hard work, and respect for nature.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start ">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                      3. The tradition of "Merti Alas" (Forest Cleansing)
                  </h2>
                  <p className="mb-4 text-justify">
                  This tradition is held every year as a form of gratitude to nature that has given life. Residents together cleaned up the village forest area, planted trees, and held sacrificial rituals to ask for the protection and preservation of nature.
                  </p>
                </div>
                <Image 
                  src="/images/forest-cleansing.jpeg" 
                  alt="Ngiring Srawung" 
                  width={442} 
                  height={308} 
                  className="rounded-lg object-fill" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <Image 
                  src="/images/festival-manud-jaya.jpeg" 
                  alt="manud-jaya dance" 
                  width={442} 
                  height={308} 
                  className="rounded-lg object-fill" 
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                  4. Cultural Festival "Manud Jaya"
                  </h2>
                  <p className="mb-4 text-justify">
                  Every year, the village holds the Manud Jaya Festival which displays various folk arts, such as puppetry, ketoprak, traditional culinary, and produce exhibitions. This festival is an attraction for tourists and strengthens the cultural identity of the village.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
};

export default About;