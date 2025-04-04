import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all bookings with pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const bookings = await prisma.booking.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tour: {
          select: {
            id: true,
            title: true,
            price: true,
            duration: true,
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    const total = await prisma.booking.count();

    return NextResponse.json({
      data: bookings,
      meta: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
