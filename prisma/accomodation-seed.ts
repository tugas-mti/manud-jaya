import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create locations first
  const location1 = await prisma.location.create({
    data: {
      name: "Ubud, Bali",
      latitude: -8.5069,
      longitude: 115.2624,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Mike",
      email: "mike@gmail.com",
      password: "hashedpassword",
      phoneNumber: "+6281234567890",
    },
  });

  // Create accommodations with images and reviews
  const ecoVilla = await prisma.accommodation.create({
    data: {
      name: "Eco-Stay Bamboo Villa",
      description: "Sustainable bamboo villa surrounded by rice terraces",
      locationId: location1.id,
      price: 500000,
      currency: "IDR",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1729673766564-618fce6c835e?q=80&w=1920",
            altText: "Eco Villa Front View",
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: "Amazing sustainable villa with breathtaking views!",
            userId: user.id,
          },
          {
            rating: 4,
            comment: "Beautiful property, very peaceful and eco-friendly",
            userId: user.id,
          },
        ],
      },
    },
  });

  const ecoLodge = await prisma.accommodation.create({
    data: {
      name: "Eco-Serenity Forest Lodge",
      description: "Peaceful eco-lodge nestled in the jungle",
      locationId: location1.id,
      price: 500000,
      currency: "USD",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1729673766564-618fce6c835e?q=80&w=1920",
            altText: "Lodge Exterior",
          },
        ],
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: "Perfect forest retreat! Absolutely loved it",
            userId: user.id,
          },
          {
            rating: 5,
            comment: "Incredible jungle experience, highly recommend",
            userId: user.id,
          },
        ],
      },
    },
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
