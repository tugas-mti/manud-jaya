import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  const [total, data] = await prisma.$transaction([
    prisma.bookingAccommodation.count(),
    prisma.bookingAccommodation.findMany({
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
        accommodation: {
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return NextResponse.json({
    data,
    meta: {
      total,
      page,
      limit,
    },
  });
}
