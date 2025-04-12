import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const tour = await prisma.tour.findUnique({
      where: {
        id,
      },
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
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ data: tour });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tour details" },
      { status: 500 }
    );
  }
}
