import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!accommodation) {
      return NextResponse.json(
        { error: "accommodation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: accommodation });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching accommodation details" },
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
    const accommodation = await prisma.accommodation.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ data: accommodation });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting accommodation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const body = await request.json();
    const accommodation = await prisma.accommodation.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        images: {
          create: [{ url: body.image, altText: "Jatiluwih Image" }],
        },
        published: body.published || false,
      },
    });

    return NextResponse.json({ data: accommodation });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating accommodation" },
      { status: 500 }
    );
  }
}
