import { PrismaClient, TimeSlot, BookingStatus } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create admin user first
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      isAdmin: true,
      password: "admin123", // In production, this should be properly hashed
    },
  });

  // Create news entries
  const newsEntries = [
    {
      type: "news",
      title: "New Hiking Trail Opens in Manud Jaya",
      content:
        "We are excited to announce the opening of a new scenic hiking trail that offers breathtaking views of our natural landscape.",
      image:
        "https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?q=80&w=1280",
    },
    {
      type: "event",
      title: "Annual Cultural Dance Festival",
      content:
        "Join us for our annual cultural dance festival featuring traditional performances from local artists.",
      image:
        "https://unsplash.com/photos/I-8e7wx2hao/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQyMjI4NjQ5fA&force=true&w=800",
    },
    {
      type: "festival",
      title: "Harvest Season Celebration",
      content:
        "Experience the joy of harvest season with traditional ceremonies, local food, and community gatherings.",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1080",
    },
    {
      type: "news",
      title: "Local Artisan Market Launch",
      content:
        "A new weekly market featuring local artisans and their handcrafted products will begin next month.",
      image:
        "https://images.unsplash.com/photo-1729673766564-618fce6c835e?q=80&w=1080",
    },
    {
      type: "event",
      title: "Night Sky Photography Workshop",
      content:
        "Learn the art of capturing stunning night sky photographs in our pristine natural setting.",
      image:
        "https://images.unsplash.com/photo-1603642282073-0102b1ccb938?q=80&w=1080",
    },
    {
      type: "festival",
      title: "Traditional Music Festival",
      content:
        "Three days of traditional music performances, workshops, and cultural exchange.",
      image:
        "https://images.unsplash.com/photo-1591089954357-7f161023cf03?q=80&w=1080",
    },
    {
      type: "news",
      title: "New Eco-friendly Accommodations",
      content:
        "We are proud to announce the opening of our new sustainable lodging options for environmentally conscious travelers.",
      image:
        "https://images.unsplash.com/photo-1635302338692-6e8bb9c6375d?q=80&w=1080",
    },
    {
      type: "event",
      title: "Sunrise Yoga Retreat",
      content:
        "Join our weekend yoga retreat featuring morning sessions with breathtaking sunrise views.",
      image: "yoga-retreat.jpg",
    },
    {
      type: "festival",
      title: "Local Food Festival",
      content:
        "Celebrate our local culinary heritage with a weekend of food tastings, cooking demonstrations, and cultural performances.",
      image: "food-fest.jpg",
    },
    {
      type: "news",
      title: "Conservation Project Success",
      content:
        "Our latest wildlife conservation project has shown promising results in protecting local endangered species.",
      image: "conservation.jpg",
    },
  ];

  for (const newsEntry of newsEntries) {
    await prisma.news.create({
      data: {
        ...newsEntry,
        createdById: admin.id,
      },
    });
  }

  console.log("News seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
