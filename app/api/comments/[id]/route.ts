import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update comment
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const comment = await prisma.comment.update({
      where: { id: params.id },
      data: {
        content: body.content,
      },
      include: {
        User: true,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating comment" },
      { status: 500 }
    );
  }
}

// DELETE comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.comment.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting comment" },
      { status: 500 }
    );
  }
}
