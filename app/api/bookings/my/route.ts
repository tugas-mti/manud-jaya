import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email ?? undefined,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.id,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
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

    const total = await prisma.booking.count({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      data: bookings,
      metadata: {
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
