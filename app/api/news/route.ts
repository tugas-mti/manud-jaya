import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all news
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const published = searchParams.get("published");

    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        take: limit,
        skip: skip,
        where: {
          published: published ? published === "true" : undefined,
        },
        include: {
          createdBy: true,
        },
      }),
      prisma.news.count({
        where: {
          published: published ? published === "true" : undefined,
        },
      }),
    ]);

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
        published: body.published || false,
      },
    });
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating news" }, { status: 500 });
  }
}
