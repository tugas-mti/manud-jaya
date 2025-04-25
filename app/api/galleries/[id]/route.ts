import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const body = await request.json();
    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        published: body.published,
      },
    });
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await prisma.gallery.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Gallery deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting gallery" },
      { status: 500 }
    );
  }
}
