import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [galleries, total] = await Promise.all([
      prisma.gallery.findMany({
        take: limit,
        skip: skip,
      }),
      prisma.gallery.count(),
    ]);

    return NextResponse.json({
      data: galleries,
      meta: { total, page, limit },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gallery = await prisma.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
      },
    });
    return NextResponse.json({ data: gallery }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create gallery" },
      { status: 500 }
    );
  }
}
