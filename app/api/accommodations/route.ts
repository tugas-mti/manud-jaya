import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all accommodations with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const published = searchParams.get("published");

    const skip = (page - 1) * limit;

    const [accommodations, total] = await Promise.all([
      prisma.accommodation.findMany({
        include: {
          location: true,
          images: true,
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
          published: published === "true" ? true : undefined,
        },
      }),
      prisma.accommodation.count({
        where: {
          published: published === "true" ? true : undefined,
        },
      }),
    ]);

    return NextResponse.json({
      data: accommodations,
      meta: { total, page, limit },
    });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return NextResponse.json(
      { error: "Error fetching accommodations" },
      { status: 500 }
    );
  }
}

// POST new accommodation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const accommodation = await prisma.accommodation.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        currency: body.currency || "IDR",
        images: {
          create: [{ url: body.image, altText: "Jatiluwih Image" }],
        },
        published: body.published || false,

        // Default values
        locationId: "cm9dvjkxv0000uoap69avv0wv", // predefined location ID
      },
    });
    return NextResponse.json(accommodation, { status: 201 });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return NextResponse.json(
      { error: "Error creating accommodation" },
      { status: 500 }
    );
  }
}
