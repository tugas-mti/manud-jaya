import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all tours with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const tours = await prisma.tour.findMany({
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
    });

    const total = await prisma.tour.count();

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
