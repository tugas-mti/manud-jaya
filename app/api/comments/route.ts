import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST new comment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        userId: body.userId,
        newsId: body.newsId,
        commentId: body.commentId, // Optional for nested comments
      },
      include: {
        User: true,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
