import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single news
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        Comment: {
          include: {
            User: true,
          },
        },
        createdBy: true,
      },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching news detail" },
      { status: 500 }
    );
  }
}

// PUT update news
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const body = await request.json();
    const news = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        type: body.type,
      },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Error updating news" }, { status: 500 });
  }
}

// DELETE news
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await prisma.news.delete({
      where: { id },
    });
    return NextResponse.json({ message: "News deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting news" }, { status: 500 });
  }
}
