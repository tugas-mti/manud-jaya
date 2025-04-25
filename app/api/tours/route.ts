import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all tours with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const published = searchParams.get("published");

    const skip = (page - 1) * limit;

    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        include: {
          location: true,
          category: true,
          images: true,
          activities: true,
          inclusions: true,
          exclusions: true,
          safetyInfo: true,
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        take: limit,
        skip: skip,
        where: {
          published: published ? published === "true" : undefined,
        },
      }),
      prisma.tour.count({
        where: {
          published: published ? published === "true" : undefined,
        },
      }),
    ]);

    return NextResponse.json({
      data: tours,
      meta: { total, page, limit },
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Error fetching tours" },
      { status: 500 }
    );
  }
}

// POST new tour
export async function POST(request: Request) {
  const sluggify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  try {
    const body = await request.json();

    const tour = await prisma.tour.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        published: body.published || false,
        images: {
          create: [{ url: body.image, altText: "Jatiluwih Image" }],
        },

        // Default values
        duration: 1440, // default to 24 hours
        slug: sluggify(body.title),
        categoryId: "cm9fqae6p0003uoyqu1hptt7w", // predefined category ID
        currency: "IDR",
        language: "Indonesian",
        minGuests: 1,
        maxGuests: 10,
        cancellationPolicy: "No cancellation",
        locationId: "cm9dvjkxv0000uoap69avv0wv", // predefined location ID
      },
    });
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json({ error: "Error creating tour" }, { status: 500 });
  }
}
