import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all accommodations with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const accommodations = await prisma.accommodation.findMany({
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
    });

    const total = await prisma.accommodation.count();

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
