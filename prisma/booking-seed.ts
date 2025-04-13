import { PrismaClient, TimeSlot, BookingStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample locations
  const location1 = await prisma.location.create({
    data: {
      name: "Manud Jaya",
      latitude: -8.125293,
      longitude: 114.04213,
    },
  });

  // Create sample categories
  const hiking = await prisma.tourCategory.create({
    data: {
      name: "Hiking",
    },
  });

  const natureWalk = await prisma.tourCategory.create({
    data: { name: "Nature Walk" },
  });

  const waterActivity = await prisma.tourCategory.create({
    data: { name: "Water Activity" },
  });

  const tour2 = await prisma.tour.create({
    data: {
      title: "Jatiluwih Rice Terrace Trek",
      slug: "jatiluwih-rice-terrace-trek",
      description:
        "Explore the beautiful UNESCO heritage rice terraces of Jatiluwih",
      duration: 240, // 4 hours
      locationId: location1.id,
      price: 450000,
      currency: "IDR",
      language: "English",
      minGuests: 1,
      maxGuests: 15,
      cancellationPolicy: "Free cancellation up to 24 hours before the tour",
      categoryId: natureWalk.id,
      images: {
        create: [
          {
            url: "https://example.com/jatiluwih1.jpg",
            altText: "Jatiluwih Rice Terraces",
          },
        ],
      },
      activities: {
        create: [
          {
            title: "Rice Field Walk",
            description: "Walk through stunning rice terraces",
          },
          {
            title: "Local Farming",
            description: "Learn about traditional farming methods",
          },
        ],
      },
      inclusions: {
        create: [
          { description: "Local guide" },
          { description: "Bottled water" },
          { description: "Light snacks" },
        ],
      },
      exclusions: {
        create: [
          { description: "Transportation" },
          { description: "Personal expenses" },
        ],
      },
      safetyInfo: {
        create: [
          { description: "Wear comfortable walking shoes" },
          { description: "Bring sun protection" },
        ],
      },
    },
  });

  const tour3 = await prisma.tour.create({
    data: {
      title: "Tamblingan Lake Adventure",
      slug: "tamblingan-lake-adventure",
      description:
        "Explore the mystical Lake Tamblingan with traditional canoe",
      duration: 360, // 6 hours
      locationId: location1.id,
      price: 750000,
      currency: "IDR",
      language: "English",
      minGuests: 2,
      maxGuests: 8,
      cancellationPolicy: "Free cancellation up to 48 hours before the tour",
      categoryId: waterActivity.id,
      images: {
        create: [
          {
            url: "https://example.com/tamblingan1.jpg",
            altText: "Tamblingan Lake View",
          },
        ],
      },
      activities: {
        create: [
          {
            title: "Traditional Canoeing",
            description: "Experience traditional wooden canoe ride",
          },
          {
            title: "Temple Visit",
            description: "Visit ancient lakeside temples",
          },
        ],
      },
      inclusions: {
        create: [
          { description: "Professional guide" },
          { description: "Traditional canoe ride" },
          { description: "Lunch package" },
        ],
      },
      exclusions: {
        create: [
          { description: "Photography services" },
          { description: "Gratuities" },
        ],
      },
      safetyInfo: {
        create: [
          { description: "Life jackets provided" },
          { description: "Basic swimming ability recommended" },
        ],
      },
    },
  });

  const tour4 = await prisma.tour.create({
    data: {
      title: "Natural Spring Pool Retreat",
      slug: "natural-spring-pool-retreat",
      description:
        "Relax in pristine natural spring pools surrounded by tropical forest",
      duration: 180, // 3 hours
      locationId: location1.id,
      price: 350000,
      currency: "IDR",
      language: "English",
      minGuests: 1,
      maxGuests: 20,
      cancellationPolicy: "Free cancellation up to 24 hours before the tour",
      categoryId: waterActivity.id,
      images: {
        create: [
          {
            url: "https://example.com/spring-pool1.jpg",
            altText: "Natural Spring Pool",
          },
        ],
      },
      activities: {
        create: [
          {
            title: "Pool Swimming",
            description: "Swim in natural spring pools",
          },
          {
            title: "Nature Walk",
            description: "Short walk through tropical vegetation",
          },
        ],
      },
      inclusions: {
        create: [
          { description: "Entrance fees" },
          { description: "Towel rental" },
          { description: "Locker usage" },
        ],
      },
      exclusions: {
        create: [
          { description: "Food and beverages" },
          { description: "Swimming gear" },
        ],
      },
      safetyInfo: {
        create: [
          { description: "Changing rooms available" },
          { description: "No diving allowed" },
        ],
      },
    },
  });

  // Additional reviews for new tours
  await prisma.review.createMany({
    data: [
      {
        userId: "cm9dvjkzk0001uoapi9pm02vi",
        tourId: tour2.id,
        rating: 5,
        comment: "Beautiful rice terraces and very knowledgeable guide!",
      },
      {
        userId: "cm9dvjkzk0001uoapi9pm02vi",
        tourId: tour3.id,
        rating: 5,
        comment: "Magical lake experience, very peaceful and cultural.",
      },
      {
        userId: "cm9dvjkzk0001uoapi9pm02vi",
        tourId: tour4.id,
        rating: 5,
        comment: "Perfect natural retreat, the pools were amazing!",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
