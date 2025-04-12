import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id,
      },
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
    });

    if (!accommodation) {
      return NextResponse.json(
        { error: "accommodation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: accommodation });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching accommodation details" },
      { status: 500 }
    );
  }
}
