import { PrismaClient, TimeSlot, BookingStatus } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create sample locations
  const location1 = await prisma.location.create({
    data: {
      name: "Mount Raung",
      latitude: -8.125293,
      longitude: 114.042130,
    }
  });

  const location2 = await prisma.location.create({
    data: {
      name: "Ijen Crater",
      latitude: -8.058333,
      longitude: 114.241667,
    }
  });

  // Create sample categories
  const hiking = await prisma.tourCategory.create({
    data: {
      name: "Hiking",
    }
  });

  // Create sample tours
  const tour1 = await prisma.tour.create({
    data: {
      title: "Mount Raung Summit Attack",
      slug: "mount-raung-summit-attack",
      description: "Experience the challenging climb to Mount Raung's summit",
      duration: 1440, // 24 hours
      locationId: location1.id,
      price: 1500000,
      currency: "IDR",
      language: "English",
      minGuests: 2,
      maxGuests: 10,
      cancellationPolicy: "Free cancellation up to 24 hours before the tour",
      categoryId: hiking.id,
      images: {
        create: [
          {
            url: "https://example.com/raung1.jpg",
            altText: "Mount Raung Summit View"
          }
        ]
      },
      activities: {
        create: [
          {
            title: "Summit Attack",
            description: "Night climb to reach the summit before sunrise"
          },
          {
            title: "Camping",
            description: "Camp at base camp"
          }
        ]
      },
      inclusions: {
        create: [
          { description: "Professional guide" },
          { description: "Camping equipment" },
          { description: "Meals during trek" }
        ]
      },
      exclusions: {
        create: [
          { description: "Personal hiking gear" },
          { description: "Travel insurance" }
        ]
      },
      safetyInfo: {
        create: [
          { description: "Bring warm clothing" },
          { description: "Must be physically fit" }
        ]
      }
    }
  });

  // Create sample user
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword",
      phoneNumber: "+6281234567890",
    }
  });

  // Create sample booking
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      tourId: tour1.id,
      date: new Date('2024-01-15'),
      timeSlot: TimeSlot.MORNING,
      guests: 2,
      price: 3000000,
      status: BookingStatus.CONFIRMED
    }
  });

  // Create sample review
  const review = await prisma.review.create({
    data: {
      userId: user.id,
      tourId: tour1.id,
      rating: 5,
      comment: "Amazing experience! The guides were very professional."
    }
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
