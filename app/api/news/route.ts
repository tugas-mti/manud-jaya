import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all news
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const news = await prisma.news.findMany({
      include: {
        Comment: {
          include: {
            User: true,
          },
        },
      },
      take: limit,
      skip: skip,
    });
    const total = await prisma.news.count();

    return NextResponse.json({
      data: news,
      meta: { total, page, limit },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching news" }, { status: 500 });
  }
}

// POST new news
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const news = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        type: body.type || "news",
        createdBy: {
          connect: {
            id: body.userId,
          },
        },
      },
    });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating news" }, { status: 500 });
  }
}
